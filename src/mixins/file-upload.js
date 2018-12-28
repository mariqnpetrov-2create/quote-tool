export default {
	methods: {
		onFileChange(e) {
			const files = e.target.files || e.dataTransfer.files;

			if (!files.length) {
				return;
			}

			this.createImage(files[0]);
		},
		createImage(file) {
			const image = new Image();
			const reader = new FileReader();

			reader.onload = (e) => {
				this.image = e.target.result;

				this.imageFile = file;
			};

			reader.readAsDataURL(file);
		}
	}
};
