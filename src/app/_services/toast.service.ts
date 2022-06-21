import { Injectable } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";

@Injectable({ providedIn: "root" })
export class MyToastService {
  constructor(private mytoaster: ToastrManager) {}

  successMsg(message: string, title: string) {
    this.mytoaster.successToastr(message, title);
  }

  errorMsg(message: string, title: string) {
    this.mytoaster.errorToastr(message, title);
  }

  warningMsg(message: string, title: string) {
    this.mytoaster.warningToastr(message, title);
  }

  infoMsg(message: string) {
    this.mytoaster.infoToastr(message, "Information");
  }

  toastWaiting(msg: string) {
    this.mytoaster.warningToastr(msg, "Waiting", {
      dismiss: "controlled",
    });
  }

  toastMsg(position: any = "top-left") {
    this.mytoaster.infoToastr("This is a positioned message .", "Toast", {
      position: position,
    });
  }

  customMsg() {
    this.mytoaster.customToastr("Custom message", null, { enableHTML: true });
  }

  closeAll() {
    this.mytoaster.dismissAllToastr();
  }
}
