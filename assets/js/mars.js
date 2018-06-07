var vm = new Vue({
  el: '.mars-rover',
  data: {
  	plateauX: '',
  	plateauY: '',
  	roverX: '',
  	roverY: '',
  	roverDir: '',
  	control: '',
  	resultX: '',
  	resultY: '',
  	resultDir: ''
  },
  methods: {
  	range : function (start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
  	},
  	isNumber: function (evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
			evt.preventDefault();
		} else {
			return true;
		}
    },
    isMap: function (evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode != 76 && charCode != 108 && charCode != 114 && charCode != 82 && charCode != 109 && charCode != 77) {
			evt.preventDefault();
		} else {
			return true;
		}
    },
    lMap : function () {
    	switch (this.resultDir) {
		    case 'N': this.resultDir = 'W'; break;
		    case 'W': this.resultDir = 'S'; break;
		    case 'S': this.resultDir = 'E'; break;
		    case 'E': this.resultDir = 'N'; break;
    	}
    },
    rMap : function () {
    	switch (this.resultDir) {
    		case 'N': this.resultDir = 'E'; break;
    		case 'E': this.resultDir = 'S'; break;
    		case 'S': this.resultDir = 'W'; break;
    		case 'W': this.resultDir = 'N'; break;
    	}
    },
    move: function () {
		switch (this.resultDir) {
			case 'N': 
				this.resultY += 1;
				break;
			case 'E':
				this.resultX += 1;
				break;
			case 'S':
				this.resultY -= 1;
				break;
			case 'W':
				this.resultX -= 1;
				break;
		}
    },
    result : function () {
    	var control = this.control.split('');
    	this.resultX = this.roverX;
    	this.resultY = this.roverY;
    	this.resultDir = this.roverDir;
	    for(var i = 0; i < control.length; i++) {
	    	switch (control[i]) {
	    		case 'L': 
	    			this.lMap();
	    			break;
	    		case 'R':
	    			this.rMap();
	    			break;
	    		case 'M':
					this.move();
	    			break;
	    	}
	    }
	    this.isOutOfArea();
    },

    isOutOfArea : function () {
    	var bool = false;
    	if (this.resultX > this.plateauX || this.resultY > this.plateauY) {
	    	bool = true;
	    } else if (this.resultX < 1 || this.resultY < 1) {
	    	bool = true;
	    } else {
	    	bool = false;
	    }
	    if (bool) {
	    	alert('Out of area!');
	    }


    }
  }
})