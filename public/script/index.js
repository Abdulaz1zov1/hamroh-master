
var categories;

axios.get('/api/category/user/all')
        .then(res => {
          const categories = res?.data?.data
          document.querySelector('.nav .categories ul').innerHTML = ''

          axios.get('/api/lang').then((res) => {
            if(res.data.lang == "ru") {
              categories?.forEach(item => {
                document.querySelector('.nav .categories ul').innerHTML += `<li><a href="/filter/${item?._id}">${item?.name?.ru}</a></li>`
              })
              document.querySelector('.search_category ul').innerHTML = ''
              categories.forEach(item => {
                document.querySelector('.search_category ul').innerHTML += `<li>${item?.name?.ru}</li>`
              })
            }else if (res.data.lang == "uz"){
              categories?.forEach(item => {
                document.querySelector('.nav .categories ul').innerHTML += `<li><a href="/filter/${item?._id}">${item?.name?.uz}</a></li>`
              })
              document.querySelector('.search_category ul').innerHTML = ''
              categories.forEach(item => {
                document.querySelector('.search_category ul').innerHTML += `<li>${item?.name?.uz}</li>`
              })
            }else {
              categories?.forEach(item => {
                document.querySelector('.nav .categories ul').innerHTML += `<li><a href="/filter/${item?._id}">${item?.name?.ru}</a></li>`
              })
              document.querySelector('.search_category ul').innerHTML = ''
              categories.forEach(item => {
                document.querySelector('.search_category ul').innerHTML += `<li>${item?.name?.ru}</li>`
              })
            }
          })


         


          let categry_hide = false;
          let search_hide = false;
          let registr_hide = false;
          let language_hide = false;
          document.querySelector('.root').addEventListener('click', (e) => {
            if (e.target.className == `user_img`) {
              if (!registr_hide) {
                document.querySelector('.user div').style.height = '70px'
                registr_hide = true
              } else {
                document.querySelector('.user div').style.height = '0'
                registr_hide = false
              }
            }
            else {
              document.querySelector('.user div').style.height = '0'
              registr_hide = false
            }
          })

          document.querySelector('.root').addEventListener('click', (e) => {
            if (e.target.className == `language_img`) {
              if (!language_hide) {
                document.querySelector('.language div').style.height = '80px'
                language_hide = true
              } else {
                document.querySelector('.language div').style.height = '0'
                language_hide = false
              }
            }
            else {
              document.querySelector('.language div').style.height = '0'
              language_hide = false
            }
          })

          document.querySelector('.root').addEventListener('click', (e) => {
            if ((e.target.className == 'category_title') || (e.target.className == 'category_title_content')) {
              if (!categry_hide) {
                document.querySelector('.nav .categories ul').style.height = `${35 * categories.length + 10}px`
                categry_hide = true
              } else {
                document.querySelector('.nav .categories ul').style.height = '0vh'
                categry_hide = false
              }
            }
            else {
              document.querySelector('.nav .categories ul').style.height = '0vh'
              categry_hide = false
            }
          })
        })
        .catch((error) => {
          console.log("Kategoriyani hammasini olishda muammo bor")
        })





























// document.querySelectorAll('.nav .categories ul li').forEach(item => {
//   item.onclick = () => {
//     document.querySelector('.category_title p').innerHTML = item.innerHTML
//   }
// })

document.querySelector('.root').addEventListener('click', (e) => {
  if ((e.target.className == 'search_category_head') || (e.target.className == 'search_category_head_content')) {
    if (!search_hide) {
      document.querySelector('.search_category').style.height = `${35 * categories.length + 60}px`
      document.querySelector('.search_category').style.borderRadius = `0.6vw 0 0.6vw 0.6vw`
      document.querySelector('.search_category_head img').style.transform = 'rotateX(180deg)'
      search_hide = true
    } else {
      document.querySelector('.search_category').style.height = '45px'
      document.querySelector('.search_category').style.borderRadius = `0.6vw 0 0 0.6vw`
      document.querySelector('.search_category_head img').style.transform = 'rotateX(0deg)'
      search_hide = false
    }
  } else {
    document.querySelector('.search_category').style.height = '45px'
    document.querySelector('.search_category').style.borderRadius = `0.6vw 0 0 0.6vw`
    document.querySelector('.search_category_head img').style.transform = 'rotateX(0deg)'
    search_hide = false
  }
})

document.querySelectorAll('.search_category_body li').forEach(item => {
  item.onclick = () => {
    document.querySelector('.search_category_head p').innerHTML = item.innerHTML
  }
})

function activityCarousel() {
  document.querySelector('.carousel__button--next').onclick = () => {
    const imgs = document.querySelectorAll('.carousel__photo')
    let a
    imgs.forEach((img, i) => {
      if (img.className === 'carousel__photo initial') {
        imgs[i].classList.remove('initial')
        a = i
      };
    })
    if (a === (imgs.length - 1)) imgs[0].classList.add('initial')
    else imgs[a + 1].classList.add('initial')
  }
  document.querySelector('.carousel__button--prev').onclick = () => {
    // alert('salom')
    const imgs = document.querySelectorAll('.carousel__photo')
    let a
    imgs.forEach((img, i) => {
      if (img.className === 'carousel__photo initial') {
        imgs[i].classList.remove('initial')
        a = i
      };
    })
    if (a === 0) imgs[imgs.length - 1].classList.add('initial')
    else imgs[a - 1].classList.add('initial')
  }
  setInterval(() => {
    const imgs = document.querySelectorAll('.carousel__photo')
    let a
    imgs.forEach((img, i) => {
      if (img.className === 'carousel__photo initial') {
        imgs[i].classList.remove('initial')
        a = i
      };
    })
    if (a === (imgs.length - 1)) imgs[0].classList.add('initial')
    else imgs[a + 1].classList.add('initial')
  }, 5000)
}

let isVisible = false;
const burgerMenu = document.querySelector('.box-burger-menu');
burgerMenu.addEventListener('click', () => {
  if (!isVisible) {
    burgerMenu.classList.add('open');
    isVisible = true;
    document.querySelector('.nav .navbar ul').style.height = '145px'
  } else {
    burgerMenu.classList.remove('open');
    isVisible = false;
    document.querySelector('.nav .navbar ul').style.height = '0'
  }
});

let regExp2 = document.querySelectorAll('.box .price .summa');
regExp2.forEach(item => {
  item.innerHTML = item.innerHTML.replace(/\s+/g, '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
})

function aksiyaCarousel() {
  const carousel = document.querySelector("[data-target='carousel']");
  const card = carousel.querySelector("[data-target='card']");
  const leftButton = document.querySelector(".left_arrow img");
  const rightButton = document.querySelector(".right_arrow img");
  const carouselWidth = carousel.offsetWidth;
  const cardWidth = card.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='card']").length;
  if (Math.round(carouselWidth / cardWidth) < cardCount) {
    let offset = 0;
    const maxX = -((cardCount / 4) * carouselWidth + (cardMarginRight * (cardCount / 4)) - carouselWidth - cardMarginRight);
    setInterval(() => {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    }, 3000);

    leftButton.addEventListener("click", function () {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })

    rightButton.addEventListener("click", function () {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    })
  }


}

function recommendCarousel() {
  const carousel = document.querySelector("[data-target='recommend_carousel']");
  const card = carousel.querySelector("[data-target='recommend_card']");
  const leftButton = document.querySelector(".left_arrow_1 img");
  const rightButton = document.querySelector(".right_arrow_1 img");
  const carouselWidth = carousel.offsetWidth;
  const cardWidth = card.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='recommend_card']").length;
  if (Math.round(carouselWidth / cardWidth) < cardCount) {
    let offset = 0;
    const maxX = -((cardCount / 4) * carouselWidth + (cardMarginRight * (cardCount / 4)) - carouselWidth - cardMarginRight);
    setInterval(() => {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    }, 3500);

    leftButton.addEventListener("click", function () {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })

    rightButton.addEventListener("click", function () {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    })
  }
}

function newsCarousel() {
  const carousel = document.querySelector("[data-target='new_carousel']");
  const card = carousel.querySelector("[data-target='new_card']");
  const leftButton = document.querySelector(".left_arrow_2 img");
  const rightButton = document.querySelector(".right_arrow_2 img");
  const carouselWidth = carousel.offsetWidth;
  const cardWidth = card.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='new_card']").length;
  if (Math.round(carouselWidth / cardWidth) < cardCount) {
    let offset = 0;
    const maxX = -((cardCount / 4) * carouselWidth + (cardMarginRight * (cardCount / 4)) - carouselWidth - cardMarginRight);
    setInterval(() => {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    }, 4000);

    leftButton.addEventListener("click", function () {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })

    rightButton.addEventListener("click", function () {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    })
  }
}

function maishiyCarousel() {
  const carousel = document.querySelector("[data-target='maishiy_carousel']");
  const card = carousel.querySelector("[data-target='maishiy_card']");
  const leftButton = document.querySelector(".left_arrow_3 img");
  const rightButton = document.querySelector(".right_arrow_3 img");
  const carouselWidth = carousel.offsetWidth;
  const cardWidth = card.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='maishiy_card']").length;
  if (Math.round(carouselWidth / cardWidth) < cardCount) {
    let offset = 0;
    const maxX = -((cardCount / 4) * carouselWidth + (cardMarginRight * (cardCount / 4)) - carouselWidth - cardMarginRight);
    setInterval(() => {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    }, 3200);

    leftButton.addEventListener("click", function () {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })

    rightButton.addEventListener("click", function () {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      } if (offset === -(cardWidth + cardMarginRight) * (cardCount - Math.round((carouselWidth / cardWidth)))) {
        carousel.style.transform = `translateX(${offset}px)`;
        offset = cardWidth + cardMarginRight
      }
    })
  }
}

document.querySelector('.header .header_top .header_top_right .user div p').onclick = () => {
  document.querySelector('.root').style.height = `100vh`
  document.querySelector('.root').style.overflow = 'hidden'
  window.scrollBy(0, -1000000000)
  document.querySelector('.registr').style.display = 'block'

  document.querySelector('.window .close_registr').onclick = () => {
    document.querySelectorAll('.window_body .option input').forEach(item => { item.value = '' })
    document.querySelector('.root').style.height = `auto`
    document.querySelector('.root').style.overflow = 'auto'
    document.querySelector('.registr').style.display = 'none'
  }

  document.querySelector('.window_body .send').onclick = () => {
    let checkedInputs = true
    document.querySelectorAll('.window_body .option input').forEach(item => {
      if(item.value.trim() == '') {
        checkedInputs = false
      } 
    }) 
    if(checkedInputs) {
      if(document.querySelectorAll('.window_body .option input')[3].value === document.querySelectorAll('.window_body .option input')[4].value) {
        alert(`Siz muvaffaqqiyatli ro'yxatdan o'tdingiz!`)
        document.querySelector('.root').style.height = `auto`
        document.querySelector('.root').style.overflow = 'auto'
        document.querySelector('.registr').style.display = 'none'
        document.querySelectorAll('.registr .window .window_body .option input').forEach(item => { item.value = ''}) 
      } else {
        alert('Parolni tasdiqlashda xatolik bor')
      }
    } else {
      alert(`Ma'lumotlarni to'liq kiriting!`)
    } 
  }


  // document.querySelector('.window_body .send').onclick = () => {
  //   let inputsCheck = true
  //   document.querySelectorAll('.window_body .option input').forEach((item, i) => {
  //     if (item.value == '') {
  //       inputsCheck = false
  //     }
  //   })
  //   if (!inputsCheck) { alert(`Siz royhatdan o'tdingiz`) }
  //   else {
  //     document.querySelector('.sms_code .card .back_registr img').onclick = () => {
  //       clearInterval(time)
  //       document.querySelector('.registr').style.display = 'block'
  //       document.querySelector('.sms_code').style.display = 'none'
  //       document.querySelectorAll('.sms_code .card .card_body input').forEach((item, i) => {
  //         item.value = ''
  //       })
  //     }

  //     document.querySelector('.registr').style.display = 'none'
  //     document.querySelector('.sms_code').style.display = 'block'
  //     document.querySelectorAll('.sms_code .card .card_body input')[0].focus()

  //     document.querySelectorAll('.sms_code .card .card_body input').forEach((item, i) => {
  //       item.addEventListener('keyup', () => {
  //         if (item.value != '') {
  //           document.querySelectorAll('.sms_code .card .card_body input')[i + 1].focus()
  //         }
  //       })
  //     })

  //     document.querySelector('.limit_time .minut').innerHTML = '03'
  //     document.querySelector('.limit_time .second').innerHTML = '00'
  //     let time = setInterval(() => {
  //       let minut = parseInt(document.querySelector('.limit_time .minut').innerHTML)
  //       let second = parseInt(document.querySelector('.limit_time .second').innerHTML)
  //       if (second == 0) {
  //         if (minut != 0) {
  //           minut -= 1
  //           second = 60
  //         } else {
  //           clearInterval(time)
  //           alert(`Belgilangan vaqt tugadi. Qaytadan ro'yhatdan o'ting!`)
  //           document.querySelector('.registr').style.display = 'block'
  //           document.querySelector('.sms_code').style.display = 'none'
  //           second = 1;
  //         }
  //         document.querySelector('.limit_time .minut').innerHTML = '0' + minut
  //       }
  //       second -= 1;
  //       if (second < 10) { second = '0' + second }
  //       document.querySelector('.limit_time .second').innerHTML = second
  //     }, 1000);

  //     let check = true;
  //     let smsCode = ''
  //     document.querySelector('.sms_code .card button').onclick = () => {
  //       document.querySelectorAll('.sms_code .card .card_body input').forEach((item, i) => {
  //         if (item.value == '') { check = false }
  //         else { check = true }
  //       })
  //       if (!check) {
  //         alert('Kodni xato kiritdingiz!')
  //       } else {
  //         document.querySelectorAll('.sms_code .card .card_body input').forEach((item, i) => {
  //           smsCode = smsCode + item.value.toString()
  //         })
  //         if (smsCode == '12345') {
  //           alert(`Siz muvaffaqqiyatli ro'yhatdan o'tdingiz!`)
  //           document.querySelector('body').style.overflowY = 'auto'
  //           clearInterval(time)
  //           document.querySelector('.sms_code').style.display = 'none'

  //           document.querySelectorAll('.sms_code .card .card_body input').forEach((item, i) => {
  //             item.value = ''
  //             document.querySelectorAll('.sms_code .card .card_body input')[0].focus()
  //           })

  //           document.querySelectorAll('.registr .window .window_body .option input').forEach(item => {
  //             item.value = ''
  //           })
  //           smsCode = ''
  //         } else {
  //           document.querySelectorAll('.sms_code .card .card_body input')[0].focus()
  //           alert('Kodni xato kiritdingiz!')
  //           document.querySelectorAll('.sms_code .card .card_body input').forEach((item, i) => {
  //             item.value = ''
  //             // document.querySelectorAll('.sms_code .card .card_body input')[0].focus()
  //           })
  //           smsCode = ''
  //         }
  //       }
  //     }
  //   }
  // }
}


let checkLogin = true;
function login() {
  document.querySelector('.root').style.height = `100vh`
  document.querySelector('.root').style.overflow = 'hidden'
  window.scrollBy(0, -1000000000)
  document.querySelector('.login').style.display = 'block'

  // document.querySelector('.login_window_body .send').onclick = () => {
  //   let inputsCheck = true
  //   document.querySelectorAll('.login_window_body .option input').forEach((item, i) => {
  //     if(item.value == '') {
  //       inputsCheck = false
  //     }
  //   })
  //   if(!inputsCheck) { alert(`Ma'lumotlarni to'liq kiriting!`) }
  //   else {
  //     const login = document.querySelectorAll('.login_window_body .option input')[0].value
  //     const password = document.querySelectorAll('.login_window_body .option input')[1].value
  //     if((login == '1111') && (password == '1111')) {
  //       alert('Siz shaxsiy profilingizga kirdingiz!')
  //       document.querySelectorAll('.login_window_body .option input').forEach(item => {
  //         item.value = ''
  //       })
  //       document.querySelector('body').style.overflowY = 'auto'
  //       document.querySelector('.login').style.display = 'none'
  //       checkLogin = false
  //       document.querySelector('.header .header_top .header_top_right .user div p:nth-child(2)').innerHTML = 'Chiqish'
  //     } else {
  //       // alert('Login yoki parol xato!')
  //       document.querySelectorAll('.login_window_body .option input').forEach(item => {
  //         item.value = ''
  //       })
  //     }
  //   }
  // }
  document.querySelector('.close_login').onclick = () => {
    document.querySelector('.root').style.overflow = 'auto'
    document.querySelector('.root').style.height = 'auto'
    document.querySelector('.login').style.display = 'none'
    document.querySelectorAll('.login_window_body .option input').forEach(item => {
      item.value = ''
    })
  }
}

function exit() {
  alert('Siz shaxsiy profilingizdan chiqdingiz!')
  checkLogin = true
  document.querySelector('.header .header_top .header_top_right .user div p:nth-child(2)').innerHTML = 'Kirish'
}

document.querySelector('.header .header_top .header_top_right .user div p:nth-child(2)').onclick = () => {
  if (checkLogin) {
    login()
  } else {
    exit()
  }
}






// document.querySelector('.header_top_right img:last-child').onclick = () => {
//   document.querySelector('.buy_products').style.display = 'block'
// }

document.querySelector('.window .close_registr').onclick = () => {
  document.querySelector('body').style.overflowY = 'auto'
  document.querySelectorAll('.window_body .option input').forEach(item => {
    item.value = ''
  })
  document.querySelector('.registr').style.display = 'none'
}

activityCarousel()
aksiyaCarousel()
recommendCarousel()
newsCarousel()
maishiyCarousel()