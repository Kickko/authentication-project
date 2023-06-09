import { Controller, Post, Res, Body, Get, Req, UseGuards , UnauthorizedException, UseFilters, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { LoginDto } from './model/login.dto';
import { JwtAccessAuthGuard } from './guard/jwt-access.guard';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { RefreshTokenDto } from './model/refreshToken.dto';
import { RateLimitFilter } from './filters/login-ex.filter';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @UseFilters(RateLimitFilter)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const user = await this.authService.validateUser(loginDto);
    const access_token = await this.authService.generateAccessToken(user);
    const refresh_token = await this.authService.generateRefreshToken(user);
    
    await this.userService.setCurrentRefreshToken(refresh_token,user.id);
    res.setHeader('Authorization', 'Bearer ' + [access_token, refresh_token]);
    res.cookie('access_token', access_token, {
      httpOnly: true,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });

    if (user.isTwoFactorAuthenticationEnabled) {
      return {
        message: 'login success',
        access_token: access_token,
        refresh_token: refresh_token,
        isTwoFactorAuthenticationEnabled: true,
      }
    }
    
    return {
      message: 'login success',
      access_token: access_token,
      refresh_token: refresh_token,
      isTwoFactorAuthenticationEnabled: false,
    };
  }

  @Get('cookie')
  async cookie(@Req() req: Request) {
    console.log(req.cookies['refresh_token']);
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const newAccessToken = (await this.authService.refresh(refreshTokenDto)).accessToken;
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
      });
      res.send({newAccessToken});
    } catch(err) {
      throw new UnauthorizedException('Invalid refresh-token');
    }
  }
  
  @Get('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async user(@Req() req: any): Promise<any> {
    const userId: number = req.user.id; 
    const verifiedUser: User = await this.userService.findUserById(userId);
    return verifiedUser;
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    await this.userService.removeRefreshToken(req.user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.clearCookie('two_fa_token');
    return res.send({
      message: 'logout success'
    });
  }
}
