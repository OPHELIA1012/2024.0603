function drawSkeleton() {
    // Draw all the tracked landmark points
    for (let i = 0; i < poses.length; i++) {
      pose = poses[i];
      
      // Draw text
      partA = pose.keypoints[0];
      if(partA.score > 0.1){
        push();
        textSize(40);
        scale(-1,1);
        text("412730169,游詠婕",partA.x-width,partA.y-150);
        pop();
      }
      
      // Draw lines and images
      for (let j = 0; j < pose.keypoints.length; j++) {
        keypoint = pose.keypoints[j];
        
        if (keypoint.score > 0.1) {
          if (j === 1 || j === 3) { // 左眼和左耳
            image(dogImg, keypoint.x, keypoint.y, 150, 150);
          } else if (j === 2 || j === 4) { // 右眼和右耳
            push();
            scale(-1,1);
            image(dogImg, width - keypoint.x, keypoint.y, 150, 150);
            pop();
          }
          
          // Draw lines (shoulder to wrist)
          if (j >= 5 && j <= 8 && pose.keypoints[j + 2].score > 0.1) {
            partA = keypoint;
            partB = pose.keypoints[j + 2];
            line(partA.x, partA.y, partB.x, partB.y);
          }
        }
      }
      
      // Draw shoulder to shoulder
      partA = pose.keypoints[7];
      partB = pose.keypoints[8];
      if (partA.score > 0.1 && partB.score > 0.1) {
        push();
        image(dogImg, partA.x, partA.y, 150, 150); // 左边肩膀
        image(dogImg, partB.x, partB.y, 150, 150); // 右边肩膀
        pop();
      }
      
      // Draw hip to hip
      partA = pose.keypoints[11];
      partB = pose.keypoints[12];
      if (partA.score > 0.1 && partB.score > 0.1) {
        line(partA.x, partA.y, partB.x, partB.y);
      }
      
      // Draw shoulders to hips
      partA = pose.keypoints[5];
      partB = pose.keypoints[11];
      if (partA.score > 0.1 && partB.score > 0.1) {
        line(partA.x, partA.y, partB.x, partB.y);
      }
      
      partA = pose.keypoints[6];
      partB = pose.keypoints[12];
      if (partA.score > 0.1 && partB.score > 0.1) {
        line(partA.x, partA.y, partB.x, partB.y);
      }
      
      // Draw hip to foot
      for (let j = 11; j < 15; j++) {
        if (pose.keypoints[j].score > 0.1 && pose.keypoints[j + 2].score > 0.1) {
          partA = pose.keypoints[j];
          partB = pose.keypoints[j + 2];
          line(partA.x, partA.y, partB.x, partB.y);
        }
      }
    }
  }
