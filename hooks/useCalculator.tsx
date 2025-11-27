/**
 * useCalculator:
 * Contiene toda la lógica de la calculadora botones, operaciones, etc.
 */
import { useEffect, useRef, useState } from "react";

enum Operator {
    add = '+',
    substract = '-',
    multiply = 'x',
    divide = '÷',
    none = '',
};

export const useCalculator = () => {

    const [formula, setFormula] = useState('0');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');
    const lastOperation = useRef<Operator>(Operator.none);

    // Calcular la vista previa de la operación <ThemeText variant="h2">
    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number]);

    // Calcular el sub resultado
    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(`${subResult}`);
    }, [formula]);

    // Limpiar pantalla
    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');
        lastOperation.current = Operator.none;
    };

    // Cambiar de símbolo el número, botón +/-
    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''));
        }

        setNumber('-' + number);
    };

    // Borrar último número ingresado
    const deleteLastNumber = () => {

        // Sí el número es cero (0), no hacer nada
        if (number === '0') return;

        const newNumber = number.substring(0, number.length - 1);

        // Comprobar sí el número es negativo y es una unidad
        if (newNumber.length === 1 && newNumber.includes('-')) {
            return setNumber('0');
        }

        // Evitar dejar vacío el número
        if (newNumber.length === 0 || newNumber === undefined) {
            return setNumber('0');
        }

        setNumber(newNumber);
    };

    // Calcular resultado
    const setLastNumber = () => {

        // Sí el número es por ejemplo 123.
        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
            console.log('endWith .');
        }

        setPrevNumber(number);
        setNumber('0');
    };

    // Operación dividir
    const dividerOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    };

    // Operación multiplicar
    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    };

    // Operación sumar
    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    };

    // Operación restar
    const substractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.substract;
    };

    // Calcular sub resultado o vista previa (Segunda linea de calculadora)
    const calculateSubResult = () => {

        // Extraer los caracteres de <ThemeText variant="h1">
        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        switch (operation) {
            case Operator.add:
                return num1 + num2;
            case Operator.substract:
                return num1 - num2;
            case Operator.multiply:
                return num1 * num2;
            case Operator.divide:
                // Evitar que se divida por 0, retorna 0 por defecto
                if (num2 === 0)
                    return 0;

                return num1 / num2;
            default:
                throw new Error(`Operation ${operation} not implemented`);
        }
    };

    // Calcular resultado
    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${result}`);

        lastOperation.current = Operator.none;
        setPrevNumber('0');
    };


    // Construir el número en la pantalla de calculadora
    const buildNumber = (numberString: string) => {

        // Comprobar sí el número tiene punto decimal
        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            // Comprobar sí es otro cero (0) y no hay punto (.)
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            // Comprobar sí es cero (0), no hay punto (.) y es el primer número
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            // Evitar ceros (0) con decimales de ceros (0) Ej: 000.0000
            if (numberString === '0' && !number.includes('.')) {
                return;
            }
        }

        setNumber(number + numberString);
    };

    return {
        // Props
        formula,
        number,
        prevNumber,

        //Methods
        buildNumber,
        clean,
        toggleSign,
        deleteLastNumber,
        dividerOperation,
        multiplyOperation,
        addOperation,
        substractOperation,
        calculateSubResult,
        calculateResult,
    }
};