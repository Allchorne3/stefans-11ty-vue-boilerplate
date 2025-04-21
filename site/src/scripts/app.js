const moment = require("moment") // For date formatting

import { createApp } from 'vue';
import ExampleComponent from './components/ExampleComponent.vue';

document.addEventListener('DOMContentLoaded', () => {
	// Get the current yeaer
	document.getElementById('is-year').innerHTML = moment().year();

	createApp({
	  components: {
		ExampleComponent
	  }
	}).mount('#app');
})
