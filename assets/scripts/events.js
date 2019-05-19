// register our component
AFRAME.registerComponent("markerhandler",{
    init:function() {
      var element = document.querySelector('body');
      this.marker = document.querySelector('a-marker');
      var model = document.querySelector('#animated-model');
      var hammertime = new Hammer(element);
      var pinch = new Hammer.Pinch(); // Pinch is not by default in the recognisers
	  hammertime.add(pinch); // add it to the Manager instance

      hammertime.on("pan", (ev) => {
        let rotation = model.getAttribute("rotation")
		switch(ev.direction) {
		  case 2:
			rotation.y = rotation.y + 4;
			break;
		  case 4:
			rotation.y = rotation.y - 4;
			break;
		  case 8:
			rotation.x = rotation.x - 4;
			break;
		  case 16:
			rotation.x = rotation.x + 4;
			break;
		  default:
			break;
        }
        model.setAttribute("rotation", rotation);
      });

	hammertime.on("pinch", (ev) => {
		let scale = model.getAttribute("scale");
		if (ev.scale > 1.025) {scale.x *= 1.025;}
		else if (ev.scale < 0.975) {scale.x *= 0.975;}
		else {scale.x *= ev.scale;}
		scale.y = scale.x;
		scale.z = scale.x;
		model.setAttribute("scale", scale);
    });
  }
});

AFRAME.registerComponent