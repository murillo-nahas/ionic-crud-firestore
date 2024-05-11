import { Component, Input, OnInit } from '@angular/core';
import { DataService, Note } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id!: string;
  note!: Note;

  constructor(
    private service: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.service.getNoteById(this.id).subscribe((res) => {
      this.note = res;
    });
  }

  async deleteNote() {
    await this.service.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.service.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Note updated!.',
      duration: 2000,
    });
    toast.present();
  }
}
