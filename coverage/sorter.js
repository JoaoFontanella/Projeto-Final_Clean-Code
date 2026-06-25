/* eslint-disable */
var addSorting = (function() {
    'use strict';
    var cols,
        currentSort = {
            index: 0,
            desc: false
        };

    // Retorna o elemento da tabela-resumo
    function getTable() {
        return document.querySelector('.coverage-summary');
    }
    // Retorna o elemento thead da tabela-resumo
    function getTableHeader() {
        return getTable().querySelector('thead tr');
    }
    // Retorna o elemento tbody da tabela-resumo
    function getTableBody() {
        return getTable().querySelector('tbody');
    }
    // Retorna o elemento th da n-ésima coluna
    function getNthColumn(n) {
        return getTableHeader().querySelectorAll('th')[n];
    }

    function onFilterInput() {
        const searchValue = document.getElementById('fileSearch').value;
        const rows = document.getElementsByTagName('tbody')[0].children;

        // Tenta criar uma RegExp a partir do valor pesquisado. Se falhar (regex inválida),
        // será tratado como uma busca em texto simples
        let searchRegex;
        try {
            searchRegex = new RegExp(searchValue, 'i'); // 'i' para ignorar maiúsculas e minúsculas
        } catch (error) {
            searchRegex = null;
        }

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            let isMatch = false;

            if (searchRegex) {
                // Se uma regex válida foi criada, use-a para a comparação
                isMatch = searchRegex.test(row.textContent);
            } else {
                // Caso contrário, volte para a busca em texto simples original
                isMatch = row.textContent
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            }

            row.style.display = isMatch ? '' : 'none';
        }
    }

    // Carrega a caixa de busca
    function addSearchBox() {
        var template = document.getElementById('filterTemplate');
        var templateClone = template.content.cloneNode(true);
        templateClone.getElementById('fileSearch').oninput = onFilterInput;
        template.parentElement.appendChild(templateClone);
    }

    // Carrega todas as colunas
    function loadColumns() {
        var colNodes = getTableHeader().querySelectorAll('th'),
            colNode,
            cols = [],
            col,
            i;

        for (i = 0; i < colNodes.length; i += 1) {
            colNode = colNodes[i];
            col = {
                key: colNode.getAttribute('data-col'),
                sortable: !colNode.getAttribute('data-nosort'),
                type: colNode.getAttribute('data-type') || 'string'
            };
            cols.push(col);
            if (col.sortable) {
                col.defaultDescSort = col.type === 'number';
                colNode.innerHTML =
                    colNode.innerHTML + '<span class="sorter"></span>';
            }
        }
        return cols;
    }
    // Anexa um atributo de dados a cada elemento tr com um objeto
    // de valores indexados pelo nome da coluna
    function loadRowData(tableRow) {
        var tableCols = tableRow.querySelectorAll('td'),
            colNode,
            col,
            data = {},
            i,
            val;
        for (i = 0; i < tableCols.length; i += 1) {
            colNode = tableCols[i];
            col = cols[i];
            val = colNode.getAttribute('data-value');
            if (col.type === 'number') {
                val = Number(val);
            }
            data[col.key] = val;
        }
        return data;
    }
    // Carrega todos os dados das linhas
    function loadData() {
        var rows = getTableBody().querySelectorAll('tr'),
            i;

        for (i = 0; i < rows.length; i += 1) {
            rows[i].data = loadRowData(rows[i]);
        }
    }
    // Ordena a tabela usando os dados da i-ésima coluna
    function sortByIndex(index, desc) {
        var key = cols[index].key,
            sorter = function(a, b) {
                a = a.data[key];
                b = b.data[key];
                return a < b ? -1 : a > b ? 1 : 0;
            },
            finalSorter = sorter,
            tableBody = document.querySelector('.coverage-summary tbody'),
            rowNodes = tableBody.querySelectorAll('tr'),
            rows = [],
            i;

        if (desc) {
            finalSorter = function(a, b) {
                return -1 * sorter(a, b);
            };
        }

        for (i = 0; i < rowNodes.length; i += 1) {
            rows.push(rowNodes[i]);
            tableBody.removeChild(rowNodes[i]);
        }

        rows.sort(finalSorter);

        for (i = 0; i < rows.length; i += 1) {
            tableBody.appendChild(rows[i]);
        }
    }
    // Remove os indicadores de ordenação da coluna atual
    function removeSortIndicators() {
        var col = getNthColumn(currentSort.index),
            cls = col.className;

        cls = cls.replace(/ sorted$/, '').replace(/ sorted-desc$/, '');
        col.className = cls;
    }
    // Adiciona os indicadores de ordenação da coluna atual
    function addSortIndicators() {
        getNthColumn(currentSort.index).className += currentSort.desc
            ? ' sorted-desc'
            : ' sorted';
    }
    // Adiciona listeners de evento para todos os elementos de ordenação
    function enableUI() {
        var i,
            el,
            ithSorter = function ithSorter(i) {
                var col = cols[i];

                return function() {
                    var desc = col.defaultDescSort;

                    if (currentSort.index === i) {
                        desc = !currentSort.desc;
                    }
                    sortByIndex(i, desc);
                    removeSortIndicators();
                    currentSort.index = i;
                    currentSort.desc = desc;
                    addSortIndicators();
                };
            };
        for (i = 0; i < cols.length; i += 1) {
            if (cols[i].sortable) {
                // Adiciona o handler de clique no th para que o usuário
                // não precise clicar nas setinhas pequenas
                el = getNthColumn(i).querySelector('.sorter').parentElement;
                if (el.addEventListener) {
                    el.addEventListener('click', ithSorter(i));
                } else {
                    el.attachEvent('onclick', ithSorter(i));
                }
            }
        }
    }
    // Adiciona a funcionalidade de ordenação à interface
    return function() {
        if (!getTable()) {
            return;
        }
        cols = loadColumns();
        loadData();
        addSearchBox();
        addSortIndicators();
        enableUI();
    };
})();

window.addEventListener('load', addSorting);
