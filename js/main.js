Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText"/>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">В наличии</p>
        <p v-else>Нет в наличии</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <p>Доставка: {{ shipping }}</p>
        <div
          class="color-box"
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
        >
        </div>
        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Добавить в корзину
        </button>
        <button
          v-on:click="removeFromCart"
          :disabled="!inStock"
        >
          Удалить из корзины
        </button>
      </div>
      <product-tabs :reviews="reviews"></product-tabs>
    </div>
  `,
    data() {
        return {
            product: "Носки",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "Пара носок",
            details: ['80% хлопок', '20% полиэстер', 'Унисекс'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            reviews: []
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
});






let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
    }
});