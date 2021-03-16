'use strict';

/**
 * 获取树
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 * @param {*} label 过滤空格
 */
export function getTrees(data, id, pid, label) {
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  let map = {}
  data.forEach(item => {
    item[label] = item[label].trim()
    map[item[id]] = item
  })
  data.forEach(item => {
    let parent = map[item[pid]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 获取唯一数组
 * @param {*} arr
 */
export function arrayUnique(arr) {
  return Array.from(new Set(arr));
}

/**
 * 获取数组并集
 * @param {*} a
 * @param {*} b
 */
export function arrayUnion(a, b) {
  return a.concat(b.filter((v) => !a.includes(v)));
}

/**
 * 获取数组交集
 * @param {*} a
 * @param {*} b
 */
export function arrayIntersection(a, b) {
  return a.filter((v) => b.includes(v));
}

/**
 * 获取数组差集
 * @param {*} a
 * @param {*} b
 */
export function arrayDifference(a, b) {
  return a.concat(b).filter((v) => a.includes(v) && !b.includes(v));
}

/**
 * 数组首尾互换
 * @param {*} arr
 * @param {*} a 添加的位置
 * @param {*} b 删除的位置
 */
export function InclusiveExchange(arr, a, b) {
  arr[a] = arr.splice(b, 1, arr[a])[0];
  return arr;
}

/**
 * 递归添加层级
 * @param {*} array
 * @param {*} level
 */
export function addLevel(array, level = 0) {
  array.forEach((arr) => {
    arr.level = level;
    if (arr.children) {
      addLevel(arr.children, level + 1);
    }
  });
  return array;
}

/**
 * 冒泡排序：相邻的两个数进行比较  大数下沉  小数上浮
 * 1.依次比较相邻的两个数，如果第一个比第二个小，不变。如果第一个比第二个大，调换顺序。一轮下来，最后一个是最大的数
 * 2.对除了最后一个之外的数重复第一步，直到只剩一个数
 * @param {*} arr
 */
export function bubbleSort(arr) {
  /**for (let i = 0; i < arr.length - 1; i++) {
    console.time('改进后冒泡排序耗时');
    // n个数比较了几趟
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // 控制每趟循环比较了几次
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.timeEnd('改进后冒泡排序耗时');
  return arr; */

  // 改造后速度快很多，初始时,最后位置保持不变
  let i = arr.length - 1;
  while (i > 0) {
    // 每趟开始时,无记录交换
    let pos = 0;
    for (let j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        // 记录交换的位置
        pos = j;
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    // 为下一趟排序作准备
    i = pos;
  }
  return arr;
}

/**
 * 选择排序
 * 1.找出最小的数，和第一个交换位置
 * 2.在剩下的数中，找出最二小的数，放在第二个
 * 3.依次类推，排出顺序
 * @param {*} arr
 */
export function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr;
}

/**
 * 插入排序
 * 1.把数组分为[已排序]和[未排序]两部分,第一个数为[已排序]，其余为[未排序]
 * 2.从[未排序]抽出第一个数，和[已排序]部分比较，插入到合适的位置
 * @param {*} arr
 */
export function insertionSort(arr) {
  let len = arr.length, // 数组的长度
    value, // 当前比较的值
    i, // 未排序部分的当前位置
    j; //  已排序部分的当前位置

  for (i = 0; i < len; i++) {
    // 储存当前位置的值
    value = arr[i];
    /*
     * 当已排序部分的当前元素大于value，
     * 就将当前元素向后移一位，再将前一位与value比较
     */
    for (j = i - 1; j > -1 && arr[j] > value; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = value;
  }
  return arr;
}

/**
 * 合并排序
 * 1.不断将数组对半分，直到每个数组只有一个
 * 2.将分出来的部分重新合并
 * 3.合并的时候按顺序排列
 * @param {*} arr
 */
export function mergeSort(arr) {
  // 只有一个数的时候退出递归
  if (arr.length < 2) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);

  // 被拆分的数组重新合并
  let merge = (left, right) => {
    let result = [],
      leftIndex = 0,
      rightIndex = 0;

    // 将两个数组合并
    // 合并的时候按从小到大的顺序
    while (leftIndex < left.length && right_index < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex++]);
      } else {
        result.push(right[rightIndex++]);
      }
    }

    // 和其他数组拼接
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };
  // 递归
  // 不断拆分只到一个数组只有一个数
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 快速排序
 * 1.以一个数为基准(中间的数)，比基准小的放到左边，比基准大的放到右边
 * 2.再按此方法对这两部分数据分别进行快速排序（递归进行）
 * 3.不能再分后退出递归，并重新将数组合并
 * @param {*} arr
 */
export function quickSort(arr) {
  // 当被分的数组只剩一个时，退出递归
  if (arr.length <= 1) {
    return arr;
  }

  // 中间基准值的index
  let pivotIndex = Math.floor(arr.length / 2);
  // 基准值
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  // 小的放左边，大的放右边
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归
  // 把数组合并在一起
  return quickSort(left).concat([pivot], quickSort(right));
}

/**
 * 二叉树排序
 * 前序遍历：根节点->左子树->右子树
 * 中序遍历：左子树->根节点->右子树
 * 后序遍历：左子树->右子树->根节点
 * 用例：
 * let arr = [8, 13, 3, 7, 19, 21, 15, 5, 6, 78, 2, 46, 12, 49];
 * let tree = new binaryTree(arr);
 * tree.init();
 * console.log('--------初始化-----------');
 * console.log(tree);

 * console.log('---------前序遍历----------');
 * tree.preorderTraversal(function (node) {
 *   console.log(node.key);
 * });
 * console.log('---------中序遍历----------');
 * tree.orderTraversal(function (node) {
 *   console.log(node.key);
 * });

 * console.log('--------后序遍历-----------');
 * tree.postorderTraversal(function (node) {
 *   console.log(node.key);
 * });

 * console.log('--------查找最小值---------');
 * console.log(tree.min());

 * console.log('--------查找最大值---------');
 * console.log(tree.max());

 * console.log('------删除值为 19的节点---------');
 * tree.removeNode(19);
 * console.log(tree);
 */
export function binaryTree(arr) {
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw new TypeError('只接受一个数组作为参数');
  }
  this.root = null; // 根节点
  this.arr = arr || []; // 接受传入的参数-数组

  // 初始化每个树节点
  let TreeNode = function (key) {
    this.key = key; // 当前节点的值
    this.left = null; // 左子树
    this.right = null; // 右子树
  };

  // 构建二叉树
  this.init = function () {
    if (!this.arr) {
      console.warn('请选择一个数组参数');
    }
    for (let i = 0, len = this.arr.length; i < len; i++) {
      this.insert(this.arr[i]);
    }
  };

  // 插入节点
  this.insert = function (key) {
    // 当前需要插入的节点
    let newNode = new TreeNode(key);
    if (this.root === null) {
      // 根节点不存在值时, 插入节点到根节点
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  };
  this.insertNode = function (rootNode, newNode) {
    if (rootNode.key > newNode.key) {
      // 当前节点的key小于父节点时, 当前节点应该插入左子树
      if (rootNode.left === null) {
        // 如果左子树不存在节点时, 把当前节点放进去
        rootNode.left = newNode;
        return;
      }
      // 左子树存在节点, 再次递归与该左节点进行比较
      this.insertNode(rootNode.left, newNode);
    } else {
      // 当前节点的key大于或等于父节点时, 当前节点应该插入右子树
      if (rootNode.right === null) {
        // 如果右子树不存在节点时, 把当前节点放进去
        rootNode.right = newNode;
        return;
      }
      // 右子树存在节点, 再次递归与该右节点进行比较
      this.insertNode(rootNode.right, newNode);
    }
  };

  // 前序遍历
  this.preorderTraversal = function (callback) {
    if (this.root === null) {
      // 传入根节点
      console.warn('请先初始化二叉排序树');
      return;
    }
    let fn = function (node, callback) {
      if (node !== null) {
        // 当前节点不等于空的时候,先遍历自身节点, 再遍历左子树节点, 最后遍历右子树节点
        callback(node); // 自身
        fn(node.left, callback); // 左子树
        fn(node.right, callback); // 右子树
      }
    };
    fn(this.root, callback);
  };

  // 中序遍历
  this.orderTraversal = function (callback) {
    // 从小到大
    callback = callback || function () { };
    if (this.root === null) {
      // 传入根节点
      console.warn('请先初始化二叉排序树');
      return;
    }
    let fn = function (node, callback) {
      if (node !== null) {
        // 当前节点不等于空的时候,先遍历左子树节点, 再遍历自身节点, 最后遍历右子树节点
        fn(node.left, callback); // 左子树
        callback(node); // 自身
        fn(node.right, callback); // 右子树
      }
    };
    fn(this.root, callback);
  };

  // 后序遍历
  this.postorderTraversal = function (callback) {
    if (this.root === null) {
      // 传入根节点
      console.warn('Please initialize first');
      return;
    }
    let fn = function (node, callback) {
      if (node !== null) {
        // 当前节点不等于空的时候,先遍历左子树节点, 再遍历右子树节点, 最后遍历自身节点
        fn(node.left, callback); // 左子树
        fn(node.right, callback); // 右子树
        callback(node); // 自身
      }
    };
    fn(this.root, callback);
  };

  this.min = function () {
    // 查找最小值就一直往左边查找就行了,直到左边没有节点为止,那就证明已经到最小值了
    let fn = function (node) {
      if (node == null) {
        // 传入根节点
        console.warn('请先初始化二叉排序树');
        return null;
      }
      if (node.left) {
        // 查找当前左子树有没有节点, 有点话继续递归查找该左节点存不存在左节点
        return fn(node.left);
      } else {
        // 直到当前节点不在存在左节点,证明取到最小值了
        return node;
      }
    };
    return fn(this.root);
  };

  // 查找最大值
  this.max = function () {
    // 跟查找最小值一样,  查找最大值就一直往右边查找就行了
    let fn = function (node) {
      if (node == null) {
        // 传入根节点
        console.warn('请先初始化二叉排序树');
        return null;
      }
      if (node.right) {
        return fn(node.right);
      } else {
        return node;
      }
    };
    return fn(this.root);
  };

  // 删除节点
  this.removeNode = function (key) {
    let fn = function (node, key) {
      if (node === null) {
        // 传入初始节点
        console.warn('请先初始化二叉排序树');
        return null;
      }
      if (node.key > key) {
        // 初始节点的值大于我要删除节点的值, 说明我要删除的节点在初始节点的左边
        node.left = fn(node.left, key); // 递归一直寻找左边的子节点,直到找到null 为止
        return node;
      } else if (node.key < key) {
        // 初始节点的值小于我要删除节点的值, 说明我要删除的节点在初始节点的右边
        node.right = fn(node.right, key);
        return node;
      } else {
        // 当前节点的值等于我要删除节点的值,说明找到要删除的节点了

        // 当前节点的左右两边分支都为空时,直接把当前节点置为null,返回出去
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }

        // 当前节点只有左边为空时, 直接引入右边的分支替换成当前分支
        if (node.left === null) {
          node = node.right;
          return node;
        }

        // 当前节点只有右边为空时, 直接引入左边的分支替换成当前分支
        if (node.right == null) {
          node = node.left;
          return node;
        }

        // 当左右两边节点都不为空时, 就需要找一个值来替换当前的值, 为了结构的完整性,最好是大于左边的值,
        // 而且小于右边的, 这个值的最佳选择就是当前节点右边的最小值, 这样就能比左边的大,  比右边的小

        // 去右边寻找最小值, 而且最小值应该在左子树上
        let minNode = rightMinNode(node.right);

        // 那我们就要删除右边最小值的那个分支, 然后把值赋值到当前节点上

        fn(node, minNode.key); // 执行右边最小值删除操作

        node.key = minNode.key;
        return node;
      }
    };

    let rightMinNode = function (node) {
      if (node.left === null) {
        // 如果第一个右子树的左子树上为空的话, 那他就是最小值, 如果存在那就往左子树上在进行查询,知道左子树为null时, 那就是最小值
        return node;
      }
      return rightMinNode(node.left);
    };
    fn(this.root, key);
  };
}
