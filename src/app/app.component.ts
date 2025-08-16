import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatContainerComponent } from './chat/chat-container/chat-container.component';
import { Role } from './core/models/role.enum';
import { User } from './core/models/user';
import { AuthService } from './core/services/auth.service';
import { LayoutService } from './core/services/layout.service';
import { NotificationService } from './core/services/notification.service';
import { SocketService } from './core/services/socket.service';
import { ThemeService } from './core/services/theme.service';
import { AppUpdateService } from './core/services/update.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    RouterOutlet,
    RouterModule,
    ChatContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private socketService = inject(SocketService);
  private notificationService = inject(NotificationService);
  private appUpdateService = inject(AppUpdateService);
  private router = inject(Router);
  public themeService = inject(ThemeService);
  private _layoutService: LayoutService = inject(LayoutService);

  private currentUserSubscription: Subscription | null = null;
  private socketSubscription: Subscription | null = null;

  socketConnected = false;

  currentUser: WritableSignal<User | null> = signal(null);
  isAdmin: WritableSignal<boolean> = signal(false);
  isMobile: Signal<boolean> = this._layoutService.isMobile;

  constructor() {
    // L'initialisation du thème se fait maintenant dans le constructeur du ThemeService
    // this.themeService.initTheme(); // Plus nécessaire ici si initTheme est appelé dans le constructeur du service
  }

  ngOnInit() {
    this.appUpdateService.initUpdateListener();

    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (user) => {
        if (!user) {
          this.socketConnected = false;
          this.router.navigate(['/auth/login']);
        } else {
          const token = this.authService.getToken();
          if (token) {
            this.socketSubscription = this.socketService
              .initSocket(token)
              .subscribe((connected) => {
                if (connected) {
                  this.notificationService.init();
                  this.socketConnected = true;
                  this.currentUser.set(user);
                  this.isAdmin.set(user?.role === Role.ADMIN);
                } else {
                  this.socketConnected = false;
                }
              });
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  logout() {
    // console.debug('[BoardComponent] logout');
    this.authService.logout();
  }
}
