module.exports = {
  interval: '30 * * * * *',
  handler(){
    console.log('定时任务： 每三十秒执行一次' + new Date());
  }
}