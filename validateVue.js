<template>
  <form action="">
    <input
      type="text"
      placeholder="Логин"
      v-model="VuexForm.login.value"
      @input="errorUndefined('login')"
    />
    <div class="block-error_full">
      <template v-for="data in VuexForm.login.error">
        <div :key="data.id" v-if="data.active === true">
          {{ data.text }}
        </div>
      </template>
      <button @click.prevent="AllCheck(VuexForm)">Отправить</button>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    AllCheck(all) {
      // console.log(all);
      for (const keyNameInput in all) {
        for (const keyReg in all[keyNameInput].regulations) {
          let NameReg = all[keyNameInput].regulations[keyReg];
          if (all[keyNameInput].error[NameReg].check === false) {
            switch (all[keyNameInput].regulations[keyReg]) {
              case "undefined":
                this.errorUndefined([keyNameInput]);
                break;

              default:
                break;
            }
          }
        }
      }
    },
    errorUndefined(name) {
      console.log("valid Undefined");
      if (this.VuexForm[name].value === "") {
        this.VuexForm[name].error.undefined.check = true;
        this.VuexForm[name].error.undefined.active = true;
      } else {
        this.VuexForm[name].error.undefined.active = false;
      }
    },
  },
  data() {
    return {
      VuexForm: {
        login: {
          value: "",
          error: {
            undefined: { text: "Введите логин", active: false, check: false },
          },
          regulations: ["undefined"],
        },
        // password: {
        //   value: "",
        //   error: {
        //     undefined: { text: "Введите пароль", active: false, check: false },
        //   },
        //   regulations: ["undefault"],
        // },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
