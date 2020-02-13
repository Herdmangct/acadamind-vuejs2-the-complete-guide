Vue.component("goodbye", {
  template: `<h1>Goodbye!</h1>`
});

const vm1 = new Vue({
  data: {
    title: "The VueJS Instance",
    showParagraph: false
  },
  methods: {
    show: function() {
      this.showParagraph = !this.showParagraph;
      this.updateTitle("The VueJS Instance (Updated)");
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
  computed: {
    lowercaseTitle: function() {
      return this.title.toLowerCase();
    }
  },
  watch: {
    title: function(value) {
      alert("Title changed, new value: " + value);
    }
  }
});

vm1.$mount("#app");

vm1.$refs.heading.innerText = "Something Else";

// vm2 = new Vue({
//   el: "hello",
//   template: `<h1>Hello!</h1>`
// });

// vm2.$mount(); // creates the template but doesn't attach it to the dom yet

// setTimeout(() => {
//   vm1.title = `Changed by Timer`;
//   vm1.show();
//   document.getElementById("app").appendChild(vm2.$el); // vanilla javascript to attach the vue template to the dom
// }, 2000);
