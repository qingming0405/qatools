<template>
  <div id="login">
    <div class="login-box">
      <div class="title-div">
        <div class="title-ch">中自庆安工具箱</div>
        <div class="title-en">SOFTWARE TOOL</div>
      </div>
      <div class="info-box">
        <div class="form-item">
          <div class="form-label info-text">状态：</div>
          <div class="form-content info-text">{{state}}</div>
        </div>
        <div class="form-item">
          <div class="form-label info-text">产品ID：</div>
          <div class="form-content info-text">{{productID}}</div>
        </div>
        <div class="form-item">
          <div class="form-label info-text">有效时间：</div>
          <div class="form-content info-text">{{effectiveTime}}</div>
        </div>
      </div>
      <div class="contral-bar">
        <el-button v-if="isActivated">立即进入</el-button>
        <el-button v-else>立即激活</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isActivated: false, // 是否激活
      state: '未激活',
      productID: '3C208A00-AF04-0C40-345E-0050569C00C3',
      effectiveTime: '--',

    }
  }
}
</script>

<style lang="scss" scoped>
  #login {
    height: 100vh;
    background: url("~assets/img/login/backpic_1080.png") no-repeat center 0px;
    background-size: cover;

    font-family:PingFang SC;
    font-weight: 500;
    color:rgba(0,0,0,1);

    .login-box {
      width: 420px;
      height: 300px;
      position: relative;
      left: 10%;
      top: calc(50% - 150px);

      // border: 1px black solid;

      .title-div {
        height: 40px;
        padding: 0px 10px;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .title-ch {
          width: 250px;

          font-size: 32px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #3A3A3A;
        }
        .title-en {
          width: 150px;

          font-size: 12px;
          font-family: DIN;
          font-weight: 400;
          color: #666666;
        }
      }

      .info-box {
        padding: 0px 10px;
        .form-item {
          height: 48px;
          padding-bottom: 10px;
          border-bottom: 1px solid #E1E1E1;

          display: flex;
          align-items: flex-end;

          .form-label {
            width: 80px;
            text-align: justify;
            text-align-last: justify;
          }
          .form-content {
            padding-left: 8px;
          }
        }
        .info-text {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
        }
      }

      .contral-bar {
        margin: 40px 10px 0px 10px;

        .el-button {
          width: 170px;
          height: 40px;
          background: #379BFF;
          opacity: 0.9;
          border-radius: 4px;

          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
    }
  }
</style>