<template>
  <form action="">
    <input
      type="text"
      placeholder="Логин"
      v-model="VuexForm.login.value"
      @input="OnSwitch('login')"
    />
    <div class="block-error_full">
      <template v-for="data in VuexForm.login.error">
        <div :key="data.id" v-if="data.active === true">
          {{ data.text }}
        </div>
      </template>
    </div>
    <input
      type="password"
      placeholder="Пароль"
      v-model="VuexForm.password.value"
      @input="OnSwitch('password')"
    />
    <div class="block-error_full">
      <template v-for="data in VuexForm.password.error">
        <div :key="data.id" v-if="data.active === true">
          {{ data.text }}
        </div>
      </template>
    </div>
    <input
      type="password2"
      placeholder="Пароль"
      v-model="VuexForm.password2.value"
      @input="OnSwitch('password2')"
    />
    <div class="block-error_full">
      <template v-for="data in VuexForm.password2.error">
        <div :key="data.id" v-if="data.active === true">
          {{ data.text }}
        </div>
      </template>
    </div>
    <button @click.prevent="buttonClick()">Отправить</button>
  </form>
</template>

<script>
export default {
  methods: {
    buttonClick() {
      if (this.AllCheck()) {
        console.log("Валидация пройдена");
      }
    },
    ServerValid() {
      let a = Math.floor(Math.random() * Math.floor(2));
      console.log(a);
      if (a === 1) {
        return true;
      } else {
        return false;
      }
    },

    OnSwitch(keyNameInput) {
      // Проверка всех правил Input client
      for (const keyReg in this.VuexForm[keyNameInput].regulations) {
        switch (this.VuexForm[keyNameInput].regulations[keyReg]) {
          case "undefined":
            this.errorUndefined(keyNameInput);
            break;
          case "valueTrue":
            this.errorValueTrue(keyNameInput);
            break;
          default:
            break;
        }
      }
    },
    AllCheckChient() {
      let fullValidClient = true;
      for (const keyNameInput in this.VuexForm) {
        this.OnSwitch(keyNameInput);
        for (const key in this.VuexForm[keyNameInput].error) {
          if (
            this.VuexForm[keyNameInput].error[key].active === true &&
            this.VuexForm[keyNameInput].error[key].type !== "server"
          ) {
            fullValidClient = false;
            break;
          }
        }
      }
      return fullValidClient;
    },
    AllCheckServer(checkClient) {
      let checkServer = true;
      if (checkClient === true) {
        for (const keyNameInput in this.VuexForm) {
          for (const keyNamePag in this.VuexForm[keyNameInput]
            .regulationsServer) {
            if (
              this.VuexForm[keyNameInput].regulationsServer[keyNamePag]() ===
              true
            ) {
              this.VuexForm[keyNameInput].error[keyNamePag].active = true;
              checkServer = false;
            } else {
              this.VuexForm[keyNameInput].error[keyNamePag].active = false;
            }
          }
        }
        return checkServer;
      } else {
        return false;
      }
    },
    AllCheck() {
      let checkClient = this.AllCheckChient();
      console.log("checkClient " + checkClient);
      let checkServer = this.AllCheckServer(checkClient);
      console.log("checkServer " + checkServer);
      return checkServer;
    },
    errorUndefined(name) {
      this.VuexForm[name].error.undefined.active =
        this.VuexForm[name].value === "";
    },
    errorValueTrue(name) {
      this.VuexForm[
        this.VuexForm[name].params.valueTrue.valueSet
      ].error.valueTrue.active =
        this.VuexForm[this.VuexForm[name].params.valueTrue.value1].value !==
        this.VuexForm[this.VuexForm[name].params.valueTrue.value2].value;
    },
    errorMinNumber(name) {},
  },

  data() {
    return {
      VuexForm: {
        login: {
          value: "",
          error: {
            undefined: { text: "Введите логин", active: false },
            loginServer: {
              text: "Логин или пароль указаны не верно",
              active: false,
              type: "server",
            },
          },
          regulations: ["undefined"],
          regulationsServer: { loginServer: this.ServerValid },
        },
        password: {
          value: "",
          error: {
            undefined: { text: "Введите пароль", active: false },
          },
          regulations: ["undefined", "valueTrue"],
          params: {
            valueTrue: {
              value1: "password",
              value2: "password2",
              valueSet: "password2",
            },
          },
        },
        password2: {
          value: "",
          error: {
            undefined: {
              text: "Введите пароль еще раз",
              active: false,
            },
            valueTrue: {
              text: "Пароли не совпадают",
              active: false,
            },
          },
          regulations: ["undefined", "valueTrue"],
          regulationsServer: [],
          params: {
            valueTrue: {
              value1: "password",
              value2: "password2",
              valueSet: "password2",
            },
          },
        },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
