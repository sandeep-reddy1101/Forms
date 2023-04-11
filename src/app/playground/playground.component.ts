import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { S3 } from 'aws-sdk';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent {
  constructor(public fb:FormBuilder) {}

  fileForm = this.fb.group({
    file: [null, [Validators.required]]
  })

  onSubmit(){
    console.log(this.fileForm.value.file)
    let fd = new FormData()
    if (this.fileForm.value.file) {
      fd.append('file', this.fileForm.value.file)
      console.log(fd)
      console.log(fd.get('file'))
      console.log()
    }
  }

  fileUploadToS3(file:FormData) {
    let s3 = new S3({
      region: 'US East (Ohio) us-east-2',
      accessKeyId: environment.aws_access_key,
      secretAccessKey: environment.aws_secret_access_key,
    })
    const params = {
      Bucket : 'my-aws-bucket-files',
      key : 'Image1',
      Body : file.get('file')
    }
  }

}


