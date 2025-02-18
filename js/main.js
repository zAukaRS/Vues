Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Пожалуйста, исправьте следующие ошибки:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Имя:</label>
        <input id="name" v-model="name" placeholder="Имя">
      </p>
      <p>
        <label for="review">Отзыв:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>
      <p>
        <label for="rating">Оценка:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Отправить">
      </p>
    </form>
  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        };
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                if (!this.name) this.errors.push("Имя обязательно.");
                if (!this.review) this.errors.push("Отзыв обязателен.");
                if (!this.rating) this.errors.push("Оценка обязательна.");
            }
        }
    }
});


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
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            return this.premium ? "Бесплатно" : 2.99;
        }
    }
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
        removeFromCart(id) {
            const index = this.cart.indexOf(id);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        }
    }
});