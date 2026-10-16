import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { legacyFoodPageMixin } from "./utils/legacyFoodProgress.js";
export function createApp() {
	const app = createSSRApp(App);
	app.mixin(legacyFoodPageMixin);
	return {
		app,
	};
}
