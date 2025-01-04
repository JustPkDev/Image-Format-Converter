
const box = document.getElementById('box');
const box_select = document.getElementById('box_select');
const input = document.createElement('input');
const main = document.getElementById('main');
const error = document.getElementById('error');
const err_msg = document.getElementById('err_msg');
const image = document.getElementById('image');
const download = document.getElementById('download');

box_select.onclick = () => {
    input.style.display = 'none';
    input.type = 'file';
    input.multiple = true;
    box.appendChild(input);
    input.click();
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(e => {
    box_select.addEventListener(e, e => e.preventDefault());
    box_select.addEventListener(e, e => e.stopPropagation());
});

['dragenter', 'dragover'].forEach(e => {
    box_select.addEventListener(e, () => box_select.style.border = '2px solid blue');
});

['dragleave', 'drop'].forEach(e => {
    box_select.addEventListener(e, () => box_select.style.border = '2px dotted blue');
});

box_select.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {

        // validation
        for(let file of files) {
            if(!file.type.includes('image/')) {
                main.classList.add('d-none');
                err_msg.innerText = 'Image required png, jpg, etc';
                error.classList.remove('d-none');
                return;
            }
        }

        // showing images
        box.classList.add('d-none');
        image.classList.remove('d-none');        

        // adding html
        for(let file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                image.children[0].insertAdjacentHTML('afterbegin', `
                <div class="rounded-2 d-flex flex-column i-c border border-primary mb-3 me-2 col-lg-3 col-xl-2 col-xxl-2 col-md-4 col-6 p-0" id='image_box'>
                    <img src="${reader.result}" class="rounded-top">
                    <div class="p-1">
                        <select class="form-select form-select-sm out rounded-0" aria-label=".form-select-sm example">
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                            <option value="webp">WEBP</option>
                        </select>
                    </div>
                </div>`);
            };
        }
        

    } else {
        main.classList.add('d-none');
        err_msg.innerText = 'No File Selected';
        error.classList.remove('d-none');
    }
});

input.onchange = e => {
    const files = e.target.files;
    if (files.length) {

        // validation
        for(let file of files) {
            if(!file.type.includes('image/')) {
                main.classList.add('d-none');
                err_msg.innerText = 'Image required png, jpg, etc';
                error.classList.remove('d-none');
                return;
            }
        }

        // showing images
        box.classList.add('d-none');
        image.classList.remove('d-none');        

        // adding html
        for(let file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                image.children[0].insertAdjacentHTML('afterbegin', `
                <div class="rounded-2 d-flex flex-column i-c border border-primary mb-3 me-2 col-lg-3 col-xl-2 col-xxl-2 col-md-4 col-6 p-0" id='image_box'>
                    <img src="${reader.result}" class="rounded-top">
                    <div class="p-1">
                        <select class="form-select form-select-sm out rounded-0" aria-label=".form-select-sm example">
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                            <option value="webp">WEBP</option>
                        </select>
                    </div>
                </div>`);
            };
        }
        

    } else {
        main.classList.add('d-none');
        err_msg.innerText = 'No File Selected';
        error.classList.remove('d-none');
    }
}

download.onclick = () => {
    const all_img = document.querySelectorAll('#image_box');
    const zip = new JSZip();

    if(all_img.length) {
        for(let i = 0; i < all_img.length; ++i) {
            
            // all elements
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
        
            // image
            const Image1 = new Image();
            Image1.src = all_img[i].children[0].src;

            // converting
            Image1.onload = () => {
                canvas.width = Image1.width;
                canvas.height = Image1.height;
                ctx.drawImage(Image1, 0, 0, Image1.width, Image1.height);

                canvas.toBlob(blob => {
                    let name = `image-${Math.round(Math.random() * 2000)}.${all_img[i].children[1].children[0].value}`;
                    zip.file(name, blob);
                    
                    // trigger
                    if(i === (all_img.length - 1)) {
                        zip.generateAsync({type:"blob"}).then(con =>  {
                            saveAs(con, "images.zip");
                        });
                    }
                }, `image/${all_img[i].children[1].children[0].value}`);
            }
        }
    }
}













