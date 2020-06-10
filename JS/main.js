$(document).ready(function () {


    const declareDefault = () => {
        pressedNum = []
        eachTime = 0
        i = 0
        firstNum = ""
        secondNum = ""
        firstNumPoint = 0
        secondNumPoint = 0
        operation = ""
        lobResult = 0
        lengResult = 0
        surpass = 0
        result = 0
        equalPressed = false
        operationPressed = false
        pointPressed = false 
    }

    declareDefault()

    const resetText = () => {
        operation = ""
        $("#lastCount").css('visibility', "hidden")
        $("#screenNumTop").html("")
        $(".equal").html("")
        $("#screenNumBottom").html("")
    }

    function makeCalc(x, y, op){
        if (x != "" && y != "") {

            switch (op) {
                case "+":
                    lobResult = parseFloat(x) + parseFloat(y)
                    break
                case "-":
                    lobResult = parseFloat(x) - parseFloat(y)
                    break
                case "x":
                    lobResult = parseFloat(x) * parseFloat(y)
                    break
                case "÷":
                    lobResult = parseFloat(x) / parseFloat(y)
                    break
            }

            $("#screenNumTop").html(x + "" + op + "" + y)
            $(".equal").html("=")
            $("#screenNumBottom").html(lobResult)
    

        }else {
            $("#lastCount").css('visibility', "hidden")
            $("#screenNumBottom").html("")
        }
    }




    //################################ REFENTE AOS BOTÕES NUMÉRICOS #######################################




    $(".numButton").click(function () {

        if (eachTime == 0 && i <= 8) {

            if($(this).val() == "." && pointPressed == false && firstNum != ""){

                $(".equal").html("")
                pressedNum.push($(this).val())
                firstNum += pressedNum[i]
                pointPressed = true
                firstNumPoint = i
                i++

            }else if($(this).val() != "."){

                pressedNum.push($(this).val())
                firstNum += pressedNum[i]
                i++
            }

        } else if (eachTime == 1 && i <= 8) {
            if($(this).val() == "." && pointPressed == false && secondNum != ""){

                pressedNum.push($(this).val())
                secondNum += pressedNum[i]
                pointPressed = true
                secondNumPoint = i
                i++

            }else if($(this).val() != "."){
                pressedNum.push($(this).val())
                secondNum += pressedNum[i]
                i++
            }
        }

        $("#screenNumTop").html(firstNum + "" + operation + "" + secondNum)
        makeCalc(firstNum, secondNum, operation)
    })



    //################################ REFERENTE AOS BOTÕES DE OPERAÇÃO #######################################




    $(".oprtnButton").click(function () {
        
        equalPressed = false

        if (($(this).val() == "x" || $(this).val() == "÷") && (operationPressed == false && firstNum != "")){

            i = 0
            operation = $(this).val()
            operationPressed = true
            pointPressed = false

            if (eachTime == 0) {

                pressedNum = []
                eachTime = 1

            } else if (eachTime == 1) {

                pressedNum = []
                eachTime = 0
                firstNum = result
                secondNum = ""
            }

        }else if(($(this).val() == "+" || $(this).val() == "-") && (operationPressed == false)){
        
            if (operationPressed == false) {

                i = 0
                
                if (eachTime == 0 && firstNum == "") {

                    pressedNum.push($(this).val())
                    firstNum += pressedNum[i]
                    i++

                } else if (eachTime == 1 && secondNum == "") {

                    pressedNum.push($(this).val())
                    secondNum += pressedNum[i]
                    i++

                }
                else{
                    $(".equal").html("")
                    pointPressed = false
                    operationPressed = true

                    operation = $(this).val()

                    if (eachTime == 0) {
                        pressedNum = []
                        eachTime = 1

                    } else if (eachTime == 1) {
                        pressedNum = []
                        eachTime = 0
                        firstNum = result
                        secondNum = ""

                    }
                }

            }else{
                
                operationPressed = true
                
                if (eachTime == 0 && firstNum == "") {
                    
                    pressedNum.push($(this).val())
                    firstNum += pressedNum[i]
                    i++

                } else if (eachTime == 1 && secondNum == ""){
                    
                    pressedNum.push($(this).val())
                    secondNum += pressedNum[i]
                    i++
                }
            }

        } else if(secondNum == "") {

            if ($(this).val() != "x" && $(this).val() != "÷"){
          
                eachTime = 1
                secondNum += $(this).val()
            }

        }

        $("#screenNumTop").html(firstNum + "" + operation + "" + secondNum)
    })



    //################################ BOTÃO DE IGUAL #######################################



    $(".equalButton").click(function () {
        
        i=0
        eachTime = 0
        firstNum = ""
        secondNum = ""
        operation = ""
        result = lobResult
        firstNum = result
        lobResult = ""
        equalPressed = true
        operationPressed = false

        $("#lastCount").css('visibility', "visible")
        $("#screenNumTop").html(result)
        $(".equal").html("")
        $("#screenNumBottom").html("")
    })



    //################################ BOTÃO DE DELEÇÃO #######################################




    $(".delButton").click(function () {

        if (result != 0 && equalPressed == true) {

            resetText()
            declareDefault()

        } else if (eachTime == 0 && firstNum != "") {
            
            operation = ""
           
            firstNum = firstNum.substring(0, (firstNum.length - 1))
            pressedNum.pop()

            if(firstNumPoint == firstNum.length){
                pointPressed = false
            }
            i--

            $("#screenNumTop").html(firstNum + "" + operation + "" + secondNum)

        } else if (firstNum != "" && secondNum == "") {

            eachTime = 0
            operation = ""
            operationPressed = false
            pressedNum = firstNum.split('')
            i += pressedNum.length    

            $("#screenNumTop").html(firstNum + "" + operation + "" + secondNum)

        } else if (eachTime == 1 && !equalPressed) {

            secondNum = secondNum.substring(0, (secondNum.length - 1))

            pressedNum.pop()

            if(secondNumPoint == secondNum.length){
                pointPressed = false
            }
            i--

            $("#screenNumTop").html(firstNum + "" + operation + "" + secondNum)

        } else {
            declareDefault()
            resetText()
        }

        makeCalc(firstNum, secondNum, operation)

    })

})
