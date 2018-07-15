
export class AppNotification {
  message: string;
  params;
  action: string;
  duration: number;

  constructor(message: string, params, action: string, duration: number) {
    this.message = message;
    this.params = params;
    this.action = action;
    this.duration = duration;
  }
}
