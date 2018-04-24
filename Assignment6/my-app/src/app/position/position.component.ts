import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from '../data/vm-typicode';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position = new Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private positionService: PositionService) { }

  ngOnInit() {
      this.paramSubscription = this.route.params.subscribe((params) => {
        this.positionSubscription = this.positionService.getPosition(params['_id']).subscribe(positions => {
          console.log("positions");
          this.position = positions[0];
        })
      })
  }

  onSubmit(f: NgForm): void {
    this.savePositionSubscription = this.positionService.savePosition(this.position).subscribe(pos => {
      this.successMessage = true;
      setTimeout(()=>{this.successMessage = false}, 2500);
    }, error =>{
      this.failMessage = true;
      setTimeout(()=>{this.failMessage=false}, 2500);
    })
  }

  routePosition(id: String) {
      this.router.navigate(['/position', id]);
  }

  ngOnDestry() {
    if (this.savePositionSubscription != null) {this.savePositionSubscription.unsubcribe()}
    if (this.positionSubscription != null) {this.positionSubscription.unsubscribe()}
    if (this.paramSubscription != null) {this.paramSubscription.unsubscribe()}
  }
}
