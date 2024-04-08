/*
1. Faça uma api para calcular o estoque médio de uma peça,
 sendo que ESTOQUE MÉDIO = (QUANTIDADE MÍNIMA + QUANTIDADE MÁXIMA) /2. */

 const express = require('express')
 const app = express()


 app.get('/estoque/:minima/:maxima', (req,res) => {

console.log(req.params)

 let QEminima = req.params.minima
 let QEmaxima = req.params.maxima
 let resultado = (QEminima + QEmaxima)/2 

 res.send(`Estoque medio: ${resultado}`)


 })
 app.use(express.json())

 // PATH PARAM /pessoa/gustavo/20
 //Teste
/*app.get('/pessoa/:nome/:idade', (req, res) => {
    console.log(req.params)
    const nomePessoa = req.params.nome
    const idadePessoa = req.params.idade
    let mais18 = null
    if (idadePessoa >= 18){
        mais18 = "Maior de idade"
    } else {
        mais18 = "Menor de idade"
    }
    res.send(`
    Olá ${nomePessoa}! Tudo bem?
    Você é ${mais18}
    `)
})

 })*/

  app.post('/exercicio1', (req, res) => {
    console.log(req.body)
    const nota1 = req.body.nota1
    const nota2 = req.body.nota2
    const nota3 = req.body.nota3
    const nota4 = req.body.nota4

    const media = (nota1 + nota2 + nota3 + nota4) / 4

    const mensagem = media >= 7 ? "Aprovado" : "Reprovado"

    const resposta = {
        media,
        mensagem
    }
    res.json(resposta)
}) 
 /*2. Uma empresa decide dar um aumento de 30% aos funcionários cujo salário é 
 inferior a 1.000 reais. Escreva uma api que receba o salário de um funcionário 
 e imprima o valor do salário reajustado ou uma mensagem caso o funcionário não
  tenha direito ao aumento. */

app.get('/salario', (req,res)=>{
let salario = req.body.salario
let reajuste = 0
if(salario <= 1000){
console.log(salario)

reajuste = ((salario/100) * 30) + salario

res.json(`Seu novo salario sera de R$${reajuste}`)
}else{


res.json("Você não tem direito ao beneficio, vai TRABALHAR!")    
}


})

/*
app.get('/pessoa', (req, res) => {
    console.log(req.query)
    const nomePessoa = req.query.nome
    const idadePessoa = req.query.idade
    let mais18 = null
    if (idadePessoa >= 18) {
        mais18 = "Maior de idade"
    } else {
        mais18 = "Menor de idade"
    }
    res.send(`
    Olá ${nomePessoa}! Tudo bem?
    Você é ${mais18}
    `)
})
*/ 
/*
3. Escrever uma api que lê o nome de um vendedor, o seu salário fixo,
 o total de vendas por ele efetuadas e o percentual que ganha sobre o total de vendas.
  Calcular o salário total do vendedor. Escrever o nome do vendedor e seu salário total.*/ 

app.get('/vendedor', (req, res)=>{

// QUERY PARAM /pessoa?nome=gustavo&idade=20
let nome = req.query.nome 
let salario = Number(req.query.salario) 
let vendas = Number(req.query.vendas) 
let percentual = Number(req.query.percentual) 
let resultado = ((vendas/100) * percentual) + salario; 
console.log(req.query)

res.json(`Salario do ${nome} é de R$${resultado} `)
 

})


/*4. Faça uma api que leia o nome de um piloto,
 uma distância percorrida em km e o tempo que o piloto levou para percorrê-la
  (em horas). O programa deve calcular a velocidade média - Velocidade = Distância / Tempo - em km/h,
   e exibir a seguinte frase: A velocidade média do <nome do piloto> foi <velocidade media calculada> km/h.*/

app.get('/velocidade', (req, res)=>{
console.log(req.body)
let nome = req.body.nome
let distancia = req.body.distancia; 
let horas = req.body.horas; 
let velocidade = distancia/horas



res.json(`A velocidade media do piloto ${nome} é de ${velocidade}Km/h.`)
})


/*5. Faça uma api que calcule e imprima o salário reajustado de um funcionário de acordo com a seguinte regra:

    • Salários até 2.000, reajuste de 50%
    • Salários maiores que 2.000, reajuste de 30% */

app.post('/salario/:reajuste', (req,res)=>{
console.log(req.params.reajuste)

let reajuste = Number(req.params.reajuste); 
let novoReajuste = 0; 

if(reajuste <= 2000 ){ 
    
novoReajuste = ((reajuste/100)*50) + reajuste; 

res.json(`Seu salario agora é de R$${novoReajuste}`)

 }
else{

    novoReajuste = ((reajuste/100)*30) + reajuste; 

    res.json(`Seu salario agora é de R$${novoReajuste}`)
}
/*6. Construa uma api que calcule o peso ideal de uma pessoa. Dados de entrada: altura e sexo. Fórmulas para cálculo do peso:
    • peso ideal de homem = (72,7 x altura) – 58
    • peso ideal da mulher = (62,1 x altura) – 44,7
*/

app.post("/pesoIdeal/:altura/:sexo", (req, res) => {
  console.log(req.params);
  let altura = Number(req.params.altura);
  let sexo = req.params.sexo;
  //let pesoIdealM = 62.1 * altura - 44.7;
  //let pesoIdealH = 72.7 * altura - 58;
  let pesoIdeal = null;

  if (sexo == "M" || sexo == "m" || sexo == "mulher" || sexo == "Mulher") {
    pesoIdeal = 62.1 * altura - 44.7;
  } else if (sexo == "H" || sexo == "h" || sexo == "homem" || sexo == "Homem") {
    pesoIdeal = 72.7 * altura - 58;
  }

  res.send(`O seu peso ideal é ${pesoIdeal.toFixed(1)}Kg`);
});

/* 7. Faça uma api para ler o código e o preço de 15 produtos, calcular e escrever:
    • O maior preço lido; e
    • A média aritmética dos preços dos produtos.
 */

app.post('/exercicio7', (req, res) => {
    let listaProdutos = []

    req.body.forEach(produto => {
        listaProdutos.push(produto)
    });

    let maiorPrecoLido = 0
    listaProdutos.forEach(produto => {
        if (produto.preco > maiorPrecoLido){
            maiorPrecoLido = produto.preco
        }
    })

    let soma = 0
    console.log("soma ", soma)
    listaProdutos.forEach(produto => {
        console.log("produto preco ", produto.preco)
        soma = soma + produto.preco
        console.log("soma ", soma)
    })

    let media = soma / listaProdutos.length

    res.json({
        maiorPrecoLido: maiorPrecoLido,
        media: media.toFixed(2)
    })
})



})


/*8. Uma empresa concederá um aumento de salário aos seus funcionários, variável de acordo com o cargo,
 conforme a tabela abaixo. Faça uma api que leia o salário e o código do cargo de um funcionário e 
 calcule o seu novo salário. Se o cargo do funcionário não estiver na tabela, ele deverá receber 15% de aumento.
  Mostre o salário antigo, o novo salário e a diferença entre ambos.
Código do Cargo -> Percentual:
    • 101 -> 5%
    • 102 -> 7,5%
    • 103 -> 10%*/
    app.get("/aumento", (req, res) => {
        console.log(req.params);
        let salario = Number(req.body.salario);
        let codigoCargo = req.body.cargo;
        let diferença = null;
        let novoSalario = null;
      
        if (codigoCargo == "101") {
          novoSalario = (salario / 100) * 5 + salario;
          diferença = novoSalario - salario;
        } else if (codigoCargo == "102") {
          novoSalario = (salario / 100) * 7.5 + salario;
          diferença = novoSalario - salario;
        } else if (codigoCargo == "103") {
          novoSalario = (salario / 100) * 10 + salario;
          diferença = novoSalario - salario;
        } else {
          novoSalario = (salario / 100) * 15 + salario;
          diferença = novoSalario - salario;
        }
      
        res.json(
          `Salario antigo:R$${salario}/ Salario atual:R$${novoSalario} /Aumento:R$${diferença}`,
        );
      });
      
/*9. Faça uma api que receba o valor do salário mínimo, o número de horas trabalhadas, 
o número de dependentes do funcionário e a quantidade de horas extras trabalhadas. 
Calcule e imprima o salário a receber do funcionário seguindo as regras abaixo:

    •  Valor da hora trabalhada é igual a 1/5 do salário mínimo;
    •  Salário do mês é igual ao número de horas trabalhadas vezes o valor da hora trabalhada;
    •  Para cada dependente acréscimo de 32 reais;
    •  Para cada hora extra trabalhada o cálculo do valor da hora trabalhada acrescida de 50 %;
    •  Salário bruto é igual ao salário do mês mais os valores dos dependentes mais os valores das horas extras;
    •  Cálculo do valor do imposto de renda retido na fonte segue a tabela abaixo:
        IRRF | Salário Bruto
        Isento Inferior a 2.000
        10% De 2.000 a 5.000
        20% Superior a 5.000
    • Salário líquido é igual ao salário bruto menos IRRF;
    • A gratificação segue a próxima tabela:
          Salário Líquido | Gratificações
          Até 3.500 | 1.000 reais
          Superior a 3.500 | 500 reais
    • Salário a receber do funcionário é igual ao salário líquido mais a gratificação. */

// cria uma rota para a url /
app.post("/salarioReceber", (req, res) => {
    console.log(req.body);
    // variveis de entrada
    let = salarioMinimo = Number(req.body.salario);
    let = horasTrabalhadas = Number(req.body.horas_trabalhadas);
    let = dependentes = Number(req.body.dependentes);
    let = horasExtras = Number(req.body.horas_extras);
  
    // calculos
    let valorHoraTrabalhada = salarioMinimo / 5;
    let salarioMes = (salarioMinimo / 5) * horasTrabalhadas;
    let extraDependente = dependentes * 32;
    let extraHora = ((((salarioMinimo / 5) / 100) * 50) + (salarioMinimo / 5)) * horasExtras;
    let salarioBruto = salarioMes + extraDependente + extraHora; 
    let salarioLiquido = null;
    let salarioReceber = null; 
 
    //logica de caculo da subritação do IRRF

 if(salarioBruto >= 2000 && salarioBruto <= 5000){

 salarioLiquido = salarioBruto - ((salarioBruto/100)* 10 )  ; 



 } else if(salarioBruto > 5000){ 

    salarioLiquido = salarioBruto - ((salarioBruto/100)* 20 ) ; 

 } else{

salarioLiquido = salarioBruto; 

 }
      
// Logica do calculo da adição da gratificação 

if(salarioLiquido <= 3500){ 

salarioReceber = salarioLiquido + 1000;

}else{ 

    salarioReceber = salarioLiquido + 500;
}


res.json(`Seu salario será de R$${salarioReceber}`)


  });
  











app.listen(3000, () =>{
    console.log("Api iniciando! Rodando em http://localhost:3000")})