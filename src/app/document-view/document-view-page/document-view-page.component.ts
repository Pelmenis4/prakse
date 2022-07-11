import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/shared/document.service';

@Component({
  selector: 'app-document-view-page',
  templateUrl: './document-view-page.component.html',
  styleUrls: ['./document-view-page.component.css']
})
export class DocumentViewPageComponent implements OnInit {

  @Output() swapClick = new EventEmitter<any>();
  id: number;
  files = [];
  pinned: boolean = false;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // gets the document index from the URL
    this.id = this.route.snapshot.params['id'] - 1; 
    // gets the files from the document to know how many pages to display
    this.files = this.documentService.documents[this.id].files; 
  }
  
  // send an event to swap the places of view-document and view-data
  onSwap() {
    this.swapClick.emit();
  }
  
  // shrinks or unshrinks the side panel
  onPin() {
    if(this.pinned == false) {
      this.hideSidePanel()
      document.getElementById('pin').classList.remove('pin');
    }
    else {
      this.showSidePanel()
      document.getElementById('pin').classList.add('pin');
    }
    this.pinned = !this.pinned;
  }

  // shows the side panel when hovered on it after the pin button is pressed.
  onEnter() {
    if(this.pinned == true) {
    this.showSidePanel()
    }
  }

  // hides the side panel when hovered on it after the pin button is pressed.
  onLeave() {
  if(this.pinned == true) {
    this.hideSidePanel()
    }
  }

  //helper functions
  hideSidePanel() {
    document.getElementById('arrow-button').classList.add('hidden');
    document.getElementById('pin-button').classList.add('hidden');
    document.getElementById('side-panel').classList.remove('side-panel');
    document.getElementById('side-panel').classList.add('side-panel2');
    document.getElementById('document-preview').classList.add('hidden');
  }

  showSidePanel() {
    document.getElementById('arrow-button').classList.remove('hidden');
    document.getElementById('pin-button').classList.remove('hidden');
    document.getElementById('side-panel').classList.add('side-panel');
    document.getElementById('side-panel').classList.remove('side-panel2');
    document.getElementById('document-preview').classList.remove('hidden');
  }

}
