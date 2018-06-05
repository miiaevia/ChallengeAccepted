import { HttpHeaders } from '@angular/common/http';
import { UserChallenge } from './../models/user-challenge';
import { Challenge } from './../models/challenge';
import { ChallengeService } from './../challenge.service';
import { Component, OnInit } from '@angular/core';
import { UserChallengeService } from '../user-challenge.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.css']
})
export class ChallengeViewComponent implements OnInit {

  displayChallenge: Challenge;
  user = new User(); // change to localstorage user when ready
  flag = false;
  testUser: User = new User(2);



  acceptChallenge () {
    const dto = {'challengeId': this.displayChallenge.id,
    'acceptorId': this.testUser.id};
    this.userChallengeService.hasUserAcceptedChallenge(dto).subscribe(
      data => {
        if (!data) {
          this.userChallengeService.acceptingAMarketChallenge(dto).subscribe(
            data2 => {
              this.getChallengeData();
            },
            error2 => {
              console.log(error2);
            }
            );
        } else {
          console.log('ALREADY IN THERE');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  navigateToUserProfile () {

  }

  getChallengeData() {
    this.challengeService.showOneChallenge(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log(data);
        // console.log(data.users);
        // console.log(data.users[0]);
        this.displayChallenge = data;
      },
      error => {
        this.displayChallenge = null;
      }
    );
  }


  constructor(private challengeService: ChallengeService,
  private userChallengeService: UserChallengeService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.getChallengeData();
  }

}
