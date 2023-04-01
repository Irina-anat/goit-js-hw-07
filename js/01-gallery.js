import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector(`.gallery`);
console.log(gallery);

function markupGallery(galleryItems) {
   // перебираю картинки, на кожній ітерації отрим об і деструкуризую
    const markup = galleryItems.map(({ preview, original, description }) => 
`<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join(""); //кожен ел масиву прриводжу до рядка
  return markup; 
};

gallery.innerHTML = markupGallery(galleryItems);  //додаю розмітку

gallery.addEventListener('click', onClickFoto)
/*galleryList.insertAdjacentHTML("beforeend", markupGallery(galleryItems));*/

function onClickFoto(event) {

    event.preventDefault();   //скасовую дію браузера за замовч
    // якщо ел не містить gallery__image - дія не виконується
    if(!event.target.classList.contains(`gallery__image`)){
        return;
    }
  //console.log(event.target)
  //const currentCard = event.target.closest(`.gallery__image`);
  //повертає першого батька з класом gallery__image
  //console.log(currentCard)
  const originalCard = event.target.dataset.source; 
  const descriptionCard = event.target.alt;
  console.log(descriptionCard)
  //бібліотека
  const instance = basicLightbox.create(`
  <img style="border-radius: 4%"  src="${originalCard}" alt="${descriptionCard}">`,
    
    {
      onShow: () => {
        window.addEventListener('keydown', onEsc);
      },
      onClose: () => {
        window.removeEventListener('keydown', onEsc);
      },
    },
  );

  const onEsc = (event) => {
    console.dir(event)
    console.log(event.code);
    if (event.code === 'Escape') {
      instance.close();
    }
  };
  
  instance.show();
}

console.log(galleryItems);

 





