<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @click="updateOneCheck(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(cart, -1, true)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum(cart, $event.target.value * 1, false)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(cart, 1, true)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link to='/trade' class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import index from '@/components/Footer/index.vue';
import { mapState, mapGetters } from "vuex";
export default {
  components: { index },
  name: "ShopCart",
  mounted() {
    this.getshopCartInfo();
  },
  methods: {
    getshopCartInfo() {
      this.$store.dispatch("getshopCartInfo");
    },
    // 修改购物车商品数
    async changeCartNum(cart, disNum, flag) {
      let originNum = cart.skuNum;

      if (flag) {
        if (originNum + disNum < 1) {
          disNum = 1 - originNum;
        }
      } else {
        if (disNum < 1) {
          disNum = 1 - originNum;
        } else {
          disNum = disNum - originNum;
        }
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getshopCartInfo();
        alert("修改成功");
      } catch (error) {
        alert(error.message);
      }
    },
    // 单个修改购物车选中状态
    async updateOneCheck(cart) {
      try {
        //发请求去修改
        await this.$store.dispatch("updateCartIscheck", {
          skuId: cart.skuId,
          isChecked: cart.isChecked ? 0 : 1,
        });
        //成功就重新获取当前购物车列表数据
        alert("修改成功");
        this.getshopCartInfo();
      } catch (error) {
        //失败就提示
        alert(error.message);
      }
    },
    // 删除单个购物车
    async deleteOne(cart){
      try {
        await this.$store.dispatch('deleteShopCart',cart.skuId)
        alert('删除成功')
        this.getshopCartInfo();
      } catch (error) {
          alert('删除失败'+ error.message)
      }
    },
    // 删除多个购物车信息
    async deleteAll(){
      try {
        await this.$store.dispatch('deleteShopCartAll')
        alert('删除多个成功')
        this.getshopCartInfo()
      } catch (error) {
        alert('删除多个失败' + error.message)
      }
    }
  },
  computed: {
    // 拿数组
    ...mapGetters(["cartInfo"]),

    cartInfoList() {
      // 从购物车列表对象当中拿到购物车列表
      return this.cartInfo.cartInfoList || [];
    },
    // 统计总件数
    checkedNum() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum;
        }
        return prev;
      }, 0);
    },
    //统计总价格
    allMoney() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum * item.skuPrice;
        }
        return prev;
      }, 0);
    },
    // 计算全选的全选框
    isCheckAll: {
      get() {
        return this.cartInfoList.every((item) => item.isChecked);
      },
      async set(val) {
        // 发请求修改所有购物车选中状态
        try {
          const result = await this.$store.dispatch(
            "updateCartIscheckAll",
            val ? 1 : 0
          );
          alert("修改成功");
          this.getshopCartInfo()
        } catch (error) {
          alert('修改失败' + error.message)
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>