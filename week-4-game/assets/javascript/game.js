var charHealth;
var charAttk;
var baseAttk;
var suchBig;
var soBrave;
var enemyHealth;
var enemyAttk;
var victory = 0;

function chooseChamp(x) {

  if (x === 1) {
    $("#priest2").fadeIn();
    charHealth = 150;
    charAttk = 10;
    baseAttk = 10;

  } else if (x === 2) {
    $("#mage2").fadeIn();
    charHealth = 120;
    charAttk = 20;
    baseAttk = 20;

  } else if (x === 3) {
    $("#rifleman2").fadeIn();
    charHealth = 180;
    charAttk = 12;
    baseAttk = 12;

  } else if (x === 4) {
    $("#hamiBox2").fadeIn();
    charHealth = 80;
    charAttk = 3;
    baseAttk = 3;
    soBrave = true;

  } 
}

function chooseFoe(x) {
  $("#battleground").show();
  $("#chooseEnemy1").hide();
  $("#chooseEnemy2").show();

  if (x === 1) {
    $("#goblin1").fadeIn();
    $("#goblin2").fadeOut();
    enemyHealth = 80;
    $(".enemyBar").html('Health: ' + enemyHealth);
    enemyAttk = 5;
    suchBig = false;

  } else if (x === 2) {
    $("#orc1").fadeIn();
    $("#orc2").fadeOut();
    enemyHealth = 150;
    $(".enemyBar").html('Health: ' + enemyHealth);
    enemyAttk = 10;
    suchBig = false;

  } else if (x === 3) {
    $("#fire1").fadeIn();
    $("#fire2").fadeOut();
    enemyHealth = 200;
    $(".enemyBar").html('Health: ' + enemyHealth);
    enemyAttk = 20;
    suchBig = false;

  } else if (x === 4) {
    $("#elemental1").fadeIn();
    $("#elemental2").fadeOut();
    enemyHealth = 300;
    $(".enemyBar").html('Health: ' + enemyHealth);
    enemyAttk = 25;
    suchBig = true;

  } 
}

function attackEnemy() {

  enemyHealth = enemyHealth - charAttk;
  $(".enemyBar").html('Health: ' + enemyHealth);
  
  if (enemyHealth <= 0) {
    $("#goblin1").fadeOut();
    $("#orc1").fadeOut();
    $("#fire1").fadeOut();
    $("#elemental1").fadeOut();
    victory++;

    if (victory === 4) {
      $("#fightScreen").fadeOut(500, function() { $("#gameWon").fadeIn(); })
    }

    return;
  }

  if (suchBig === true && soBrave === true) {
    charHealth += 10;
  } else {
    charHealth = charHealth - enemyAttk;
  }
  $(".healthBar").html("Health: " + charHealth);

  upgradeAttk();
  $(".attackBar").html("Attack: " + charAttk);

  if (charHealth <= 0) {
    $("#fightScreen").fadeOut(500, function() { $("#gameLost").fadeIn(); })
  }
}

function upgradeAttk() {
    charAttk = charAttk + baseAttk;
}

$("#fightScreen").hide();
$("#battleground").hide();
$("#goblin1").hide();
$("#orc1").hide();
$("#fire1").hide();
$("#elemental1").hide();
$("#priest2").hide();
$("#mage2").hide();
$("#rifleman2").hide();
$("#hamiBox2").hide();
$("#chooseEnemy2").hide();
$("#gameLost").hide();
$("#gameWon").hide();


$(".resetMe").click(function() {
  location.reload();
});

$(".characterSelect").click(function() {
  $("#selectionScreen").fadeOut(500, function() { $("#fightScreen").fadeIn(); })
});
