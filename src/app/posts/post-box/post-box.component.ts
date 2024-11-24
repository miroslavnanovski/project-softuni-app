import { Component,Input,OnInit} from '@angular/core';
import { Post } from '../../types/posts';
import { ApiService } from '../../api.service';



@Component({
  selector: 'app-post-box',
  standalone: true,
  imports: [],
  templateUrl: './post-box.component.html',
  styleUrl: './post-box.component.css'
})
export class PostBoxComponent{
  @Input() post!: Post;
}
