// jquery phải trái
$(document).ready(function () {
  $(".food-slider").slick({
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: ".prev-btn",
    nextArrow: ".next-btn",
  });
});

// lên đầu trang
let mybutton = document.getElementById('BackToTopBtn')
window.onscroll = function(){
    scrollFunction()
}
function scrollFunction(){
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        mybutton.style.display = "block"
    }
    else{
        mybutton.style.display = "none"
    }
}
function topFunction(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// giỏ hàng item
document.addEventListener('DOMContentLoaded', function () {
  let cart = {
    items: 0,
    total: 0.00,
    products: []
  };

  const cartDisplay = document.querySelector('.auth #item');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotal = document.getElementById('cartTotal');
  const cartModal = document.getElementById('cartModal');
  const closeModal = document.getElementsByClassName('close')[0];

  function updateCartDisplay() {
    cartDisplay.innerHTML = `${cart.items} Items - ($${cart.total.toFixed(2)})`;
  }

  function updateCartModal() {
    cartItemsList.innerHTML = '';
    cart.products.forEach((product, index) => {
      const listItem = document.createElement('li');
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-btn';
      deleteButton.addEventListener('click', function () {
        cart.items -= 1;
        cart.total -= product.price;
        cart.products.splice(index, 1);
        updateCartDisplay();
        updateCartModal();
      });

      listItem.appendChild(deleteButton);
      listItem.appendChild(document.createTextNode(`${product.name} - $${product.price.toFixed(2)}`));
      cartItemsList.appendChild(listItem);
    });
    cartTotal.textContent = cart.total.toFixed(2);
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const itemName = this.getAttribute('data-name');
      const itemPrice = parseFloat(this.getAttribute('data-price'));

      cart.items += 1;
      cart.total += itemPrice;
      cart.products.push({ name: itemName, price: itemPrice });

      updateCartDisplay();
      updateCartModal();
    });
  });

  cartDisplay.addEventListener('click', function () {
    cartModal.style.display = 'block';
  });

  closeModal.onclick = function() {
    cartModal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == cartModal) {
      cartModal.style.display = 'none';
    }
  }

  updateCartDisplay();
});


// Big sale
document.addEventListener('DOMContentLoaded', function () {
  function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timeDifference = midnight - now;

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    document.querySelector('.timer div:nth-child(1) span:nth-child(1)').textContent = days < 10 ? '0' + days : days;
    document.querySelector('.timer div:nth-child(2) span:nth-child(1)').textContent = hours < 10 ? '0' + hours : hours;
    document.querySelector('.timer div:nth-child(3) span:nth-child(1)').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.querySelector('.timer div:nth-child(4) span:nth-child(1)').textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
