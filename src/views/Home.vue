<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Счет</h3>

            <button
              class="btn waves-effect waves-light btn-small"
              @click="refresh"
            >
              <i class="material-icons">refresh</i>
            </button>
          </div>

          <Loader v-if="loading"></Loader>

          <div v-else class="row">
            <HomeBill :rates="currency.rates"></HomeBill>
            <HomeCurrency
              :rates="currency.rates"
              :date="currency.date"
            ></HomeCurrency>
          </div>
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";
import Loader from "@/components/app/Loader.vue";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency =  await this.$store.dispatch("fetchCurrency");
      setTimeout(()=>this.loading = false,1000);
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
    Loader,
  },
};
</script>
