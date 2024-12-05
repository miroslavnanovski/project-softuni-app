import { Component } from '@angular/core';
import { CreatePostComponent } from '../../create-post/create-post.component';

@Component({
  selector: 'app-empty-post',
  standalone: true,
  imports: [CreatePostComponent],
  templateUrl: './empty-post.component.html',
  styleUrl: './empty-post.component.css'
})
export class EmptyPostComponent {

}
