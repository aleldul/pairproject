let script_tag = document.getElementById('data')
let dataGame = script_tag.getAttribute('data');
dataGame = JSON.parse(dataGame)

function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
  }
  
  
  var score = 0,
      previousTarget = 0;
  
  
  function gameEnd() {
  
    var endgifs = ["https://www.dropbox.com/s/x56jqmgqdh4weh9/congrats.gif?raw=1", "https://www.dropbox.com/s/zpcj50qk7unal91/congrats2.gif?raw=1", "https://www.dropbox.com/s/agsedov8mlnxh9j/congrats3.gif?raw=1", "https://www.dropbox.com/s/ck1ptya4uxthtl8/congrats4.gif?raw=1"];
    $('#game').removeClass('in-game').html('<div style="text-align: center"><img class="congratsimg" src="'+endgifs[Math.floor((Math.random() * 4))]+'"/><p class="scored">YOU SCORED <strong style="font-size: 53px;display: block;">'+score+'</strong></p><button id="playgame">Play Again</button><div class="social-share">Share your score: <ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//bluegrasscoms.com/halloween" target="_blank"><img src="https://www.dropbox.com/s/vsfuchbzym4cl7i/facebook.svg?raw=1"/></a></li><li><a href="https://twitter.com/home?status=I%20scored%20'+score+'%20on%20the%20Wanted%20-%20Dead%20or%20Alive%20Halloween%20Game,%20try%20and%20beat%20my%20score%20here%20https%3A//bit.ly/2ECobCh%20%23WantedDeadOrAlive%20%23Halloween%20%23Bluegrasscoms" target="_blank"><img src="https://www.dropbox.com/s/ulp7ittyz8wbgy5/twitter.svg?raw=1"/></a></li></ul></div></div>');
    $('#playgame').on('click', function() {
      score = 0;
      startgame();
    });
  }
  
  function roundFunction() {
  
    var icons = ["icon0", "icon1", "icon2", "icon3", "icon4", "icon5"];
  
    var target = randomExcluded(0,5,previousTarget),
        hasTarget = false,
        iconhtml = '';
  
    previousTarget = target;
  
    $('#game-target').addClass('icon'+target);
  
    var count = 30;
  
    for (i = 0; i < count; i++) {
  
      if(i === 29) {
     
        setTimeout(function() {
  
          var theTarget = $('#game-main').find('.icon'+target);
  
          if(theTarget.length > 0) {
  
            var number = randomExcluded(0,5,target);
            $('#game-main').append('<div class="icon '+icons[number]+'"></div>');
  
          } else {
  
            $('#game-main').append('<div class="icon icon'+target+'"></div>');
  
          }
  
        }, 1);
  
  
      } else {
  
        var number = Math.floor(Math.random() * 6);
        
        if(number == target && hasTarget == false) {
  
          iconhtml += '<div class="icon '+icons[number]+'"></div>';
          hasTarget = true;
          
        } else {
  
          var number = randomExcluded(0,5,target);
          iconhtml += '<div class="icon '+icons[number]+'"></div>';
  
        }
  
      }
  
    }
  
    $('#game-main').html(iconhtml);
  
  }
  
  function round() {
  
    $('#game-main').html('');
  
    roundFunction();
  
    $('#game-main').on('click', '.icon', function() {
  
      var targetClass = $('#game-target').attr('class');
  
      if($(this).hasClass(targetClass)) {
  
        $(this).addClass('correct');
  
        score += 5;
        $('#score').html(score);
  
        $('#game-main').addClass('clicked');
  
        setTimeout(function() {
          $('#game-main').removeClass('clicked');
          $('#game-target').attr('class', '');
          roundFunction();
        }, 700);
  
      } else {
  
        var that = $(this);
        that.addClass('wrong');
  
        if(score > 0) {
          score -= 1;
          $('#score').html(score);
        }
   
        setTimeout(function() {
          that.removeClass('wrong');
        }, 700)
  
      }
  
    });
  
  }
  
  function startgame() {
    
    $('#game').addClass('in-game').html(`<h2 class="gameheading">MERRY CHRISTMAS</h2><div id="game-target"></div><div id="game-main"></div><div id="score">0</div><div id="counter">${dataGame.time}</div>`);
  
    round();
  
    countdown();
  
  
    setTimeout(function() {
  
      var timer = setInterval(function() {
      var firsticon = $('#game-main .icon:first-child');
  
        firsticon.clone().appendTo('#game-main');
        firsticon.remove();
  
      }, 1000);
      var number = dataGame.time,
          gameCounter = $('#counter');
  
      var counter = setInterval(function() {
        number = (number -= 1);
        gameCounter.html(number);
      }, 1000);
  
      setTimeout(function() {
        clearInterval(timer);
        clearInterval(counter);
        gameEnd();
      }, Number(`${dataGame.time}000`))
  
    }, 3000);
  
  }
  
  function countdown() {
  
    $('<div class="countdown"><div class="number active">3</div></div>').appendTo('body');
  
    var countdownNumber = 3,
        numberContainer = $('.number');
  
  
    var counter = setInterval(function() {
      countdownNumber = (countdownNumber -= 1);
      numberContainer.html(countdownNumber).addClass('active');
    }, 1000);
  
    setTimeout(function() {
      clearInterval(counter);
       $('.countdown').remove();
    }, 3000);
  
  }
  
  $(document).ready(function() {
    console.log('jalan nih')
    
  
    $('#game').html(`<div class="intro"><h2 class="gameheading"><span>CHRISTMAS MODE</span> Have Fun !</h2><p>Find the wanted character quickly before they move to earn 5 points, click on the wrong character and lose a point but work fast, you only have <strong>${dataGame.time} seconds</strong>! <span style="display: block;margin-top: 10px"><strong>Ghooooooood luuuck!</strong></span></p><button id="startgame">Start Game</button></div>`);
    $('#game').on('click', '#startgame', function() {
      
      startgame();
    });
  
  });