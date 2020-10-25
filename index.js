var xoro = new Vue({
    el: '#xoro',
    data: {
      turn: true,
      round: 0,
      pattern: [
          [1,2,3], [4,5,6], [7,8,9], [1,5,9],
          [1,4,7], [2,5,8], [3,6,9], [3,5,7]
      ],
      player_x: {
          score: 0,
          marked: []
        },
      player_o: {
        score: 0,
        marked: []
        }  
    },
    methods: {
        mark: function(i){
            const block = document.getElementById(i);
            if(this.turn)
            {
                block.classList.add('block-X');
                block.firstChild.classList.add('fas','fa-times');
                this.player_x.marked.push(i);
            }
                
            if(!this.turn)
            {
                block.classList.add('block-O');
                block.firstChild.classList.add('far','fa-circle');
                this.player_o.marked.push(i);
            }

            this.turn = !this.turn;
            this.round++;
        },
        reset: function(){
            setTimeout(() =>{
                this.player_x.marked = [];
                this.player_o.marked = [];
                this.turn = true;
                this.round = 0;
                let block = document.querySelectorAll('div.block');
                let icon = document.querySelectorAll('i');
                for (var i = 0; i < block.length; i++) {
                    block[i].classList.remove('block-X', 'block-O');
                    icon[i].classList.remove('far','fa-circle', 'fas','fa-times');
                }
            }, 150);
        }
    },
    watch:{
        'player_x.marked': function(){
            if(this.player_x.marked.length > 0){
                this.pattern.forEach(arr => {
                    if(this.player_x.marked.includes(arr[0]) && this.player_x.marked.includes(arr[1]) && this.player_x.marked.includes(arr[2]))
                    {
                        this.reset();
                        this.player_x.score++;
                    }
                });
            }
        },
        'player_o.marked': function(){
            if(this.player_o.marked.length > 0){
                this.pattern.forEach(arr => {
                    if(this.player_o.marked.includes(arr[0]) && this.player_o.marked.includes(arr[1]) && this.player_o.marked.includes(arr[2]))
                    {
                        this.reset();
                        this.player_o.score++;
                    }
                });
            }
        },
        round: function(){
            if(this.round == 9){
                this.reset();
            }
        }
    }
  });