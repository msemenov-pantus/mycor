<template>
  <form action="">
    <Validinput
      @input="OnSwitch('login')"
      :VuexForm="VuexForm.login"
      v-model:validInput="VuexForm.login.value"
      placeholder="Логин"
    />
    <Validinput
      @input="OnSwitch('password')"
      :VuexForm="VuexForm.password"
      v-model:validInput="VuexForm.password.value"
      placeholder="Пароль"
    />
    <Validinput
      @input="OnSwitch('password2')"
      :VuexForm="VuexForm.password2"
      v-model:validInput="VuexForm.password2.value"
      placeholder="Пароль еще раз"
    />
    <button @click.prevent="buttonClick()">Отправить</button>
  </form>
</template>

<script>
import Validinput from "@/components/Validinput.vue";
export default {
  methods: {
    buttonClick() {
      if (this.AllCheck()) {
        console.log("Валидация пройдена");
      }
    },
    ServerValid() {
      let a = Math.floor(Math.random() * Math.floor(2));
      if (a === 1) {
        return true;
      } else {
        return false;
      }
    },

    OnSwitch(keyNameInput) {
      console.log(keyNameInput);
      // Проверка всех правил Input client
      for (const keyReg in this.VuexForm[keyNameInput].regulations) {
        switch (this.VuexForm[keyNameInput].regulations[keyReg]) {
          case "undefined":
            this.errorUndefined(keyNameInput);
            break;
          case "RegExp":
            this.errorRegExp(keyNameInput);
            break;
          case "valueTrue":
            this.errorValueTrue(keyNameInput);
            break;
          case "minLength":
            this.errorMinLength(keyNameInput);
            break;
          case "maxLength":
            this.errorMaxLength(keyNameInput);
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

    errorRegExp(name) {
      this.VuexForm[name].error.RegExp.active = !this.VuexForm[
        name
      ].params.RegExp.test(this.VuexForm[name].value);
    },
    errorUndefined(name) {
      console.log(this.VuexForm[name].value);
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
    errorValueFalse(name) {
      this.VuexForm[
        this.VuexForm[name].params.valueFalse.valueSet
      ].error.valueTrue.active =
        this.VuexForm[this.VuexForm[name].params.valueFalse.value1].value ===
        this.VuexForm[this.VuexForm[name].params.valueFalse.value2].value;
    },
    errorMinLength(name) {
      this.VuexForm[name].error.minLength.active =
        this.VuexForm[name].value.length <=
        this.VuexForm[name].params.minLength;
    },
    errorMaxLength(name) {
      this.VuexForm[name].error.maxLength.active =
        this.VuexForm[name].value.length >=
        this.VuexForm[name].params.maxLength;
    },
  },

  data() {
    return {
      VuexForm: {
        login: {
          value: "",
          error: {
            RegExp: {
              text: "Логин должен состоять из англиских символов и цифр",
              active: false,
            },
            undefined: { text: "Введите логин", active: false },
            minLength: {
              text: "Логин должен содержать больше 6 символов",
              active: false,
            },
            maxLength: {
              text: "Логин должен содержать менее 20 символов",
              active: false,
            },
            loginServer: {
              text: "Логин или пароль указаны не верно",
              active: false,
              type: "server",
            },
          },
          regulations: ["undefined", "minLength", "maxLength", "RegExp"],
          regulationsServer: { loginServer: this.ServerValid },
          params: {
            minLength: 6,
            maxLength: 20,
            RegExp: /^[A-Za-z0-9]+$/,
          },
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
  components: {
    Validinput,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>









<template>
  <input
    @input="$emit('update:validInput', $event.target.value)"
    :value="VuexForm.value"
    :type="typeInput"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
  <div class="block-error_full">
    <template v-for="data in VuexForm.error">
      <div :key="data.id" v-if="data.active === true">
        {{ data.text }}
      </div>
    </template>
  </div>
</template>
<script>
export default {
  emits: ["update:validInput"],
  props: {
    placeholder: {
      type: String,
    },
    typeInput: {
      type: String,
      default: "text",
    },
    VuexForm: {
      type: Object,
    },
  },
};
</script>