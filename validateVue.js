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