var Pizza_Count = 1;
var Pizza_List = [];

const c = (el) => {
    return document.querySelector(el)
}

function fecharModal() {

    setTimeout(() => {
        c('.pizzaWindowArea').style.opacity = 0;
    }, 200);
    setTimeout(() => {
        c(' .pizzaWindowArea').style.display = 'none'
    }, 400)
    c('.pizzaInfo--qtarea .pizzaInfo--qt').innerHTML = 1;
    Pizza_Count = 1;


}


c('header .menu-openner').addEventListener('click', () => {
    if (c('header .menu-openner span').textContent == 0) {

    }
    else {
        c('aside').style.left = 0
    }


})


c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})

pizzaJson.map((item, index) => {
    let pizza_item = c('.models .pizza-item').cloneNode(true)

    c('.pizza-area').appendChild(pizza_item)
    pizza_item.setAttribute('data-key', index);

    pizza_item.querySelector('.pizza-item--name').innerHTML = item.name
    pizza_item.querySelector('.pizza-item--price').innerHTML += item.price
    pizza_item.querySelector('.pizza-item--desc').innerHTML = item.description
    pizza_item.querySelector('.pizza-item--img img').src = item.img



    pizza_item.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modkey = key;


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200)
        c('.pizzaWindowArea .pizzaInfo--desc').innerHTML = item.description;
        c('.pizzaWindowArea .pizzaInfo--actualPrice').innerHTML = 'R$ ' + item.price;
        price = item.price;
        imagem = item.img;
        c('.pizzaWindowArea .pizzaInfo h1').innerHTML = item.name;
        c('.pizzaWindowBody .pizzaBig img').src = item.img
        c('div[data-key="0"] span').innerHTML = item.sizes[0]
        c('div[data-key="1"] span').innerHTML = item.sizes[1]
        c('div[data-key="2"] span').innerHTML = item.sizes[2]

        //Botão cor
        document.querySelectorAll('.pizzaInfo--size').forEach((e) => {

            e.addEventListener('click', () => {
                let a = c('.selected');
                a.classList.remove('selected');
                e.classList.add('selected');





            })

        })


        c('.pizzaWindowArea .pizzaInfo--cancelButton').addEventListener('click', fecharModal);
        c('.pizzaWindowBody .pizzaInfo--cancelMobileButton').addEventListener('click', fecharModal)



    })
})






// botão mais

c('.pizzaInfo--qtarea .pizzaInfo--qtmais').addEventListener('click', () => {

    Pizza_Count += 1;
    console.log(Pizza_Count)

    c('.pizzaInfo--qtarea .pizzaInfo--qt').innerHTML = Pizza_Count;



})

//botão menos
c('.pizzaInfo--qtarea .pizzaInfo--qtmenos').addEventListener('click', () => {


    if (Pizza_Count >= 2) {
        Pizza_Count--;
        c('.pizzaInfo--qtarea .pizzaInfo--qt').innerHTML = Pizza_Count
    }
    else {
        alert('Não é possível adicionar número 0 de pizzas!')

    }





})

// Botão para Finalizar

c('.cart--finalizar').addEventListener('click', () => {
    alert('Compra realizada com sucesso!\n')

    c('.menu-openner span').innerHTML = 0;
    c('aside').classList.remove('show')
    c('aside').style.left = '100vw'


})


// Botão para adicionar

c('.pizzaInfo--addButton').addEventListener('click', () => {

    let tamanho = c('.selected span').textContent;


    if (tamanho == '860g') {
        tamanho = 'G'
    }
    else if (tamanho == '530g') {
        tamanho = 'M'
    }
    else {
        tamanho = 'P'
    }




    if (Pizza_Count > 0) {

        c('header .menu-openner span').innerHTML = parseInt(c('header .menu-openner span').textContent) + Pizza_Count;


        if (Pizza_List.find((a) => {
            return a.name === pizzaJson[modkey].name && a.size === tamanho
        })) {

            let index = Pizza_List.indexOf(Pizza_List.find((a) => {
                return a.name === pizzaJson[modkey].name && a.size == tamanho

            }))


            Pizza_List[index].quantidade++;
            c('.cart--area .cart--item--qt').innerHTML = Pizza_List[index].quantidade;



        }
        else {
            Pizza_List.push({ name: pizzaJson[modkey].name, quantidade: Pizza_Count, size: tamanho, imagem: imagem, price: price, id: pizzaJson[modkey].id })

            console.log(Pizza_List)
            carrinho()



        }
        fecharModal();


    }





})

// Função do carrinho 

function carrinho() {

    setTimeout(() => {
        c('aside').classList.add('show')
    }, 350);


    c('.cart').innerHTML = '';


    for (let i in Pizza_List) {

        cartItem = c('.models .cart--item').cloneNode(true)

        cartItem.querySelector('.cart--item--qt').innerHTML = Pizza_List[i].quantidade;
        cartItem.querySelector('.cart--item .cart--item-nome').innerHTML = Pizza_List[i].name + ' - ' + Pizza_List[i].size
        cartItem.querySelector('.cart--item img').src = Pizza_List[i].imagem;

        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {

            Pizza_List[i].quantidade += 1
            carrinho()


        })

        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {

            if (Pizza_List[i].quantidade >= 2) {
                Pizza_List[i].quantidade--;
                carrinho();
            }
            else {
                Pizza_List.splice(i, 1);
                carrinho();
                if (Pizza_List.length === 0) {
                    setTimeout(() => {
                        c('.menu-openner span').innerHTML = 0;
                        c('aside').classList.remove('show')
                        c('aside').style.left = '100vw'
                    }, 350);
                }

            }

        })



        c('.cart').append(cartItem)
    }
    atualizar_valor();

}

// Função atualiza valor

function atualizar_valor() {

    let subtotal_price = c('[class$="subtotal"] .valor--mudar')
    let desconto_price = c('[class$="desconto"] .valor--mudar')
    let total = c('[class$="total big"] .valor--mudar')

    let valor = 0
    let desconto = 0
    Pizza_List.forEach((a) => {
        valor += a.price * a.quantidade;
    })
    valor = valor.toFixed(2)
    subtotal_price.innerHTML = 'R$ ' + valor;
    desconto = valor * 0.10
    desconto = desconto.toFixed(2);
    desconto_price.innerHTML = `R$ ${desconto}`
    total.innerHTML = `R$ ${(valor - desconto).toFixed(2)}`

}
