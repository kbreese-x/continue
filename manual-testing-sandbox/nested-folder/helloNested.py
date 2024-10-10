from typing import List

Vector = List[float]


def main(a: Vector):
    print("Hello Nested!")


class MyClass:
    def test(a: Vector) -> Vector:
        return a[5]


# raise Exception("This is an error")


myclass = MyClass()

myclass.test([1,2,3])