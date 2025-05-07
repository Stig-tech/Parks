function getCart() {
	return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(button) {
	const product = button.closest('.product');
	const title = product.querySelector('h2').innerText;
	const size = product.querySelector('select[name="size"]')?.value || '';
	const color = product.querySelector('select[name="color"]').value;
	const quantity = parseInt(product.querySelector('input[type="number"]').value);
	const productNumber = product.querySelector('.product-number').value;
	const image = product.querySelector('img').getAttribute('src');
	const waist = product.querySelector('select[name="waist"]')?.value || '';
	const length = product.querySelector('select[name="length"]')?.value || '';

	const item = {
		title,
		size,
		color,
		quantity,
		productNumber,
		image,
		waist,
		length
	};

	let cart = getCart();
	cart.push(item);
	saveCart(cart);

	alert('Item added to cart!');
}

function renderCart() {
	const cart = getCart();
	const container = document.getElementById('cart-items');
	const form = document.getElementById('checkout-form');

	if (!container) return;

	if (cart.length === 0) {
		container.innerHTML = '<p style="text-align:center; font-weight:bold;">Your cart is empty.</p>';
		if (form) form.style.display = 'none';
		return;
	} else {
		if (form) form.style.display = 'block';
	}

	container.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="border-bottom: 1px solid #ccc; padding: 10px 0;">
            <img src="${item.image}" alt="${item.title}" style="width: 100px; float: left; margin-right: 20px;" />
            <div style="overflow: hidden;">
                <h3>${item.title}</h3>
                <p><strong>Item:</strong> ${item.productNumber}</p>
                ${item.size ? `<p><strong>Size:</strong> ${item.size}</p>` : ''}
                ${item.waist ? `<p><strong>Waist:</strong> ${item.waist}</p>` : ''}
                ${item.length ? `<p><strong>Length:</strong> ${item.length}</p>` : ''}
                <p><strong>Color:</strong> ${item.color}</p>
                <label>Quantity:
                    <input type="number" value="${item.quantity}" min="1" onchange="updateItem(${index}, 'quantity', parseInt(this.value))" />
                </label><br>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        </div>
    `).join('');
}

function updateItem(index, key, value) {
	const cart = getCart();
	cart[index][key] = value;
	saveCart(cart);
	renderCart();
}

function removeItem(index) {
	const cart = getCart();
	cart.splice(index, 1);
	saveCart(cart);
	renderCart();
}

function submitOrder() {
	const park = document.getElementById('park').value.trim();
	const name = document.getElementById('name').value.trim();
	const phone = document.getElementById('phone').value.trim();
	const email = document.getElementById('email').value.trim();
	const cart = getCart();

	if (!park || !name || !phone || !email) {
		alert('Please fill in all fields.');
		return;
	}

	if (cart.length === 0) {
		alert('Your cart is empty.');
		return;
	}

	const formData = new FormData();
	formData.append('park', park);
	formData.append('name', name);
	formData.append('phone', phone);
	formData.append('email', email);
	formData.append('cart', JSON.stringify(cart));

	fetch('submit.php', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) throw new Error('Network error.');
			return response.text();
		})
		.then(data => {
			alert(data);
			localStorage.removeItem('cart');
			window.location.href = 'index.html';
		})
		.catch(error => {
			console.error('Submission error:', error);
			alert('There was an error submitting your order.');
		});
}