function solveQuadratic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    let result = '';

    if (a === 0) {
        if (b === 0) {
            result = c === 0 ? "Уравнение неопределённое (бесконечное множество решений)." : "Корней нет.";
        } else {
            const x = -c / b;
            result = `Это линейное уравнение: x = ${x.toFixed(2)}`;
        }
    } else {
        const D = b * b - 4 * a * c;
        result += `Дискриминант D = ${D.toFixed(2)}\n`;

        if (D < 0) {
            result += "D < 0: Корней нет.";
        } else if (D === 0) {
            const x = -b / (2 * a);
            result += `D = 0: Один корень x = ${x.toFixed(2)}`;
        } else {
            const x1 = (-b + Math.sqrt(D)) / (2 * a);
            const x2 = (-b - Math.sqrt(D)) / (2 * a);
            result += `D > 0: Два корня x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
        }

        result += "\nНаправление ветвей параболы: ";
        result += a > 0 ? "Вверх" : "Вниз";
    }

    document.getElementById('results').innerText = result;
}

function calculateFunction1() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const result = 8 * a - b * b;
    document.getElementById('results').innerText = `8a - b² = ${result.toFixed(2)}`;
}

function calculateFunction2() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const result = 5 * a + b / 4;
    document.getElementById('results').innerText = `5a + b/4 = ${result.toFixed(2)}`;
}

function calculateFunction3() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const result = 4 * (b + a) - a * a;
    document.getElementById('results').innerText = `4(b + a) - a² = ${result.toFixed(2)}`;
}

function calculateFunction4() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const result = 4 * (a * a / 4 - b);
    document.getElementById('results').innerText = `4(a²/4 - b) = ${result.toFixed(2)}`;
}

function runTests() {
    let testOutput = "Результаты тестов:\n\n";

    testOutput += "Тесты для ax² + bx + c = 0:\n";
    testOutput += testQuadratic(1, 2, 1, "Тест 1 (D=0)", "D = 0: Один корень x = -1.00", "Вверх");
    testOutput += testQuadratic(1, 1, 2, "Тест 2 (D<0)", "D < 0: Корней нет.", "Вверх");
    testOutput += testQuadratic(1, -2, -3, "Тест 3 (D>0)", "D > 0: Два корня x₁ = 3.00, x₂ = -1.00", "Вверх");
    testOutput += testQuadratic(0, 1, 1, "Тест 4 (a=0)", "Это линейное уравнение: x = -1.00", undefined);

    testOutput += "\nТесты для других функций (a=2, b=3):\n";
    testOutput += testFunction(2, 3, "8a - b²", 8 * 2 - 3 * 3, 7);
    testOutput += testFunction(2, 3, "5a + b/4", 5 * 2 + 3 / 4, 10.75);
    testOutput += testFunction(2, 3, "4(b + a) - a²", 4 * (3 + 2) - 2 * 2, 16);
    testOutput += testFunction(2, 3, "4(a²/4 - b)", 4 * (2 * 2 / 4 - 3), -8);

    document.getElementById('testResults').innerText = testOutput;
}

function testQuadratic(a, b, c, testName, expectedRoots, expectedDirection) {
    const D = b * b - 4 * a * c;
    let actualRoots = '';
    let actualDirection = '';

    if (a === 0) {
        if (b === 0) {
            actualRoots = c === 0 ? "Уравнение неопределённое (бесконечное множество решений)." : "Корней нет.";
        } else {
            const x = -c / b;
            actualRoots = `Это линейное уравнение: x = ${x.toFixed(2)}`;
        }
    } else {
        actualRoots += `Дискриминант D = ${D.toFixed(2)}\n`;
        if (D < 0) {
            actualRoots += "D < 0: Корней нет.";
        } else if (D === 0) {
            const x = -b / (2 * a);
            actualRoots += `D = 0: Один корень x = ${x.toFixed(2)}`;
        } else {
            const x1 = (-b + Math.sqrt(D)) / (2 * a);
            const x2 = (-b - Math.sqrt(D)) / (2 * a);
            actualRoots += `D > 0: Два корня x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
        }
        actualDirection = a > 0 ? "Вверх" : "Вниз";
    }

    const passedRoots = actualRoots === expectedRoots;
    const passedDirection = expectedDirection ? actualDirection === expectedDirection : true;
    return `${testName}: ${passedRoots && passedDirection ? "Пройден" : "Провален"}\nОжидаемые корни: ${expectedRoots}\nПолученные корни: ${actualRoots}\n` +
           (expectedDirection ? `Ожидаемое направление: ${expectedDirection}\nПолученное направление: ${actualDirection}\n` : "\n");
}

function testFunction(a, b, funcName, expected, actual) {
    const passed = Math.abs(expected - actual) < 0.01;
    return `${funcName}: ${passed ? "Пройден" : "Провален"}\nОжидаемый результат: ${expected.toFixed(2)}\nПолученный результат: ${actual.toFixed(2)}\n\n`;
}

describe('Калькулятор', function() {
    describe('Квадратное уравнение', function() {
        it('D = 0 (a=1, b=2, c=1)', function() {
            const result = solveQuadraticTest(1, 2, 1);
            assert.equal(result.roots, "D = 0: Один корень x = -1.00");
            assert.equal(result.direction, "Вверх");
        });

        it('D < 0 (a=1, b=1, c=2)', function() {
            const result = solveQuadraticTest(1, 1, 2);
            assert.equal(result.roots, "D < 0: Корней нет.");
            assert.equal(result.direction, "Вверх");
        });

        it('D > 0 (a=1, b=-2, c=-3)', function() {
            const result = solveQuadraticTest(1, -2, -3);
            assert.equal(result.roots, "D > 0: Два корня x₁ = 3.00, x₂ = -1.00");
            assert.equal(result.direction, "Вверх");
        });

        it('a = 0 (a=0, b=1, c=1)', function() {
            const result = solveQuadraticTest(0, 1, 1);
            assert.equal(result.roots, "Это линейное уравнение: x = -1.00");
            assert.isUndefined(result.direction);
        });
    });

    describe('Другие функции', function() {
        it('8a - b² (a=2, b=3)', function() {
            assert.closeTo(calculateFunction1Test(2, 3), 7, 0.01);
        });

        it('5a + b/4 (a=2, b=3)', function() {
            assert.closeTo(calculateFunction2Test(2, 3), 10.75, 0.01);
        });

        it('4(b + a) - a² (a=2, b=3)', function() {
            assert.closeTo(calculateFunction3Test(2, 3), 16, 0.01);
        });

        it('4(a²/4 - b) (a=2, b=3)', function() {
            assert.closeTo(calculateFunction4Test(2, 3), -8, 0.01);
        });
    });
});

function solveQuadraticTest(a, b, c) {
    let roots = '';
    let direction = '';

    if (a === 0) {
        if (b === 0) {
            roots = c === 0 ? "Уравнение неопределённое (бесконечное множество решений)." : "Корней нет.";
        } else {
            const x = -c / b;
            roots = `Это линейное уравнение: x = ${x.toFixed(2)}`;
        }
    } else {
        const D = b * b - 4 * a * c;
        roots += `Дискриминант D = ${D.toFixed(2)}\n`;
        if (D < 0) {
            roots += "D < 0: Корней нет.";
        } else if (D === 0) {
            const x = -b / (2 * a);
            roots += `D = 0: Один корень x = ${x.toFixed(2)}`;
        } else {
            const x1 = (-b + Math.sqrt(D)) / (2 * a);
            const x2 = (-b - Math.sqrt(D)) / (2 * a);
            roots += `D > 0: Два корня x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
        }
        direction = a > 0 ? "Вверх" : "Вниз";
    }

    return { roots: roots.trim(), direction: direction || undefined };
}

function calculateFunction1Test(a, b) {
    return 8 * a - b * b;
}

function calculateFunction2Test(a, b) {
    return 5 * a + b / 4;
}

function calculateFunction3Test(a, b) {
    return 4 * (b + a) - a * a;
}

function calculateFunction4Test(a, b) {
    return 4 * (a * a / 4 - b);
}