/**
* Created by Alane on 14-3-7.
*/
/**
* direct 0 上
* 1 右
* 2 下
* 3 左
* @param x
* @param y
* @param direct
* @constructor
*/
//******************************************************************************************/
//坦克父类
function Tank (x, y, direct) {
    this.speed = 2;
    //上的操作
    }
    Tank.prototype.moveUp = function () {
    //边界检测
    if (this.y < 0) {
    //换方向
    this.changeDirect ();
    return;
    }
    this.y -= this.speed;
    this.direct = 0;
    //下的操作
    }
    Tank.prototype.moveDown = function () {
    if (this.y > height - 30) {
    this.changeDirect ();
    return;
    }
    this.y += this.speed;
    this.direct = 2;
    }
    //左的操作
    Tank.prototype.moveLeft = function () {
    if (this.x < 0) {
    this.changeDirect ();
    return;
    }
    this.x -= this.speed;
    this.direct = 3;
    //右的操作
    }
    Tank.prototype.moveRight = function () {
    if (this.x > width - 30) {
    this.changeDirect ();
    return;
    }
    this.x += this.speed;
    this.direct = 1;
    
    }
    
    //变换方向
    Tank.prototype.changeDirect = function () {
    while (true) {
    var temp = Math.round (Math.random () * 3);
    if (this.direct != temp) {
    this.direct = temp;
    break;
    }
    }
    //alert("x="+this.x+" y="+this.y+" direct="+this.direct)
    }
    
    //射击子弹
    Tank.prototype.shot = function () {
    if(this.isdead){
    return;
    }
    if (this.bulletsList.length < this.maxBulletSize) {
    //新建子弹
    var bullet = null;
    switch (this.direct) {
    case 0:
    bullet = new Bullet (this.x + 10, this.y - 2, 0, this.color);
    break;
    case 1:
    bullet = new Bullet (this.x + 32, this.y + 10, 1, this.color);
    break;
    case 2:
    bullet = new Bullet (this.x + 10, this.y + 32, 2, this.color);
    break;
    case 3:
    bullet = new Bullet (this.x - 2, this.y + 10, 3, this.color);
    break;
    }
    //放入弹夹
    this.bulletsList.push (bullet);
    }
    }
    //******************************************************************************************/
    //玩家
    function Hero (x, y, direct) {
    this.lifetimes = 5;
    this.isdead = false;
    this.color = '#FF0000';
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.bulletsList = [];
    this.maxBulletSize = 10;
    this.newlife = null;
    }
    Hero.prototype = new Tank (0, 0, 0);
    Hero.prototype.constructor = Hero;
    Hero.prototype.addLife = function(){
    this.lifetimes++;
    document.querySelector("#life").innerHTML = hero.lifetimes;
    }
    Hero.prototype.cutLife = function(){
    if(this.lifetimes>=1 && !this.newlife){
    this.lifetimes--;
    this.newlife = setTimeout("hero.newLife()",2000);
    }
    }
    Hero.prototype.newLife = function(){
    this.isdead = false;
    clearTimeout(hero.newlife);
    hero.newlife = null;
    document.querySelector("#life").innerHTML = hero.lifetimes;
    }
    
    
    //******************************************************************************************/
    //敌人坦克
    function Enemy (x, y, direct) {
    this.isdead = false;
    this.color = 'blue';
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.bulletsList = [];
    this.maxBulletSize = 1;
    
    
    //定时器,自动移动
    this.timer1 = setInterval ((function (context) {
    return function () {
    //移动
    Enemy.prototype.move.call (context);
    }
    }) (this), 30);
    
    //定时器,射击
    this.timer2 = setInterval ((function (context) {
    return function () {
    //射击
    Tank.prototype.shot.call (context);
    }
    }) (this), 2000);
    
    //定时器,变换方向
    this.timer3 = setInterval ((function (context) {
    return function () {
    //射击
    Tank.prototype.changeDirect.call (context);
    }
    }) (this), 3000);
    }
    
    Enemy.prototype = new Tank (0, 0, 0);
    Enemy.prototype.constructor = Enemy;
    Enemy.prototype.move = function () {
    switch (this.direct) {
    case 0:
    this.moveUp ();
    break;
    case 1:
    this.moveRight ();
    break;
    case 2:
    this.moveDown ();
    break;
    case 3:
    this.moveLeft ();
    break;
    }
}    