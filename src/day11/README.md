# Day 11: Dumbo Octopus [🔗](https://adventofcode.com/2021/day/11)

## Part 1

You enter a large cavern full of rare bioluminescent [dumbo octopuses](https://www.youtube.com/watch?v=eih-VSaS2g0)! They seem to not like the Christmas lights on your submarine, so you turn them off for now.

There are 100 octopuses arranged neatly in a 10 by 10 grid. Each octopus slowly gains **energy** over time and **flashes** brightly for a moment when its energy is full. Although your lights are off, maybe you could navigate through the cave without disturbing the octopuses if you could predict when the flashes of light will happen.

Each octopus has an **energy level** - your submarine can remotely measure the energy level of each octopus (your puzzle input). For example:

```
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
```

The energy level of each octopus is a value between `0` and `9`. Here, the top-left octopus has an energy level of `5`, the bottom-right one has an energy level of `6`, and so on.

You can model the energy levels and flashes of light in **steps**. During a single step, the following occurs:

- First, the energy level of each octopus increases by `1`.
- Then, any octopus with an energy level greater than `9` **flashes**. This increases the energy level of all adjacent octopuses by `1`, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than `9`, it **also flashes**. This process continues as long as new octopuses keep having their energy level increased beyond `9`. (An octopus can only flash **at most once per step**.)
- Finally, any octopus that flashed during this step has its energy level set to `0`, as it used all of its energy to flash.

Adjacent flashes can cause an octopus to flash on a step even if it begins that step with very little energy. Consider the middle octopus with `1` energy in this situation:

<pre>
Before any steps:
11111
19991
19191
19991
11111

After step 1:
34543
4<b>000</b>4
5<b>000</b>5
4<b>000</b>4
34543

After step 2:
45654
51115
61116
51115
45654
</pre>

An octopus is **highlighted** when it flashed during the given step.

Here is how the larger example above progresses:

<pre>
Before any steps:
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

After step 1:
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637

After step 2:
88<B>0</B>7476555
5<B>0</B>89<B>0</B>87<B>0</B>54
85978896<B>0</B>8
84857696<B>0</B><B>0</B>
87<B>0</B><B>0</B>9<B>0</B>88<B>0</B><B>0</B>
66<B>0</B><B>0</B><B>0</B>88989
68<B>0</B><B>0</B><B>0</B><B>0</B>5943
<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>7456
9<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>876
87<B>0</B><B>0</B><B>0</B><B>0</B>6848

After step 3:
<B>0</B><B>0</B>5<B>0</B>9<B>0</B><B>0</B>866
85<B>0</B><B>0</B>8<B>0</B><B>0</B>575
99<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>39
97<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>41
9935<B>0</B>8<B>0</B><B>0</B>63
77123<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>
791125<B>0</B><B>0</B><B>0</B>9
221113<B>0</B><B>0</B><B>0</B><B>0</B>
<B>0</B>421125<B>0</B><B>0</B><B>0</B>
<B>0</B><B>0</B>21119<B>0</B><B>0</B><B>0</B>

After step 4:
2263<B>0</B>31977
<B>0</B>923<B>0</B>31697
<B>0</B><B>0</B>3222115<B>0</B>
<B>0</B><B>0</B>41111163
<B>0</B><B>0</B>76191174
<B>0</B><B>0</B>53411122
<B>0</B><B>0</B>4236112<B>0</B>
5532241122
1532247211
113223<B>0</B>211

After step 5:
4484144<B>0</B><B>0</B><B>0</B>
2<B>0</B>44144<B>0</B><B>0</B><B>0</B>
2253333493
1152333274
11873<B>0</B>3285
1164633233
1153472231
6643352233
2643358322
2243341322

After step 6:
5595255111
3155255222
33644446<B>0</B>5
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433

After step 7:
67<B>0</B>7366222
4377366333
4475555827
34966557<B>0</B>9
35<B>0</B><B>0</B>6256<B>0</B>9
35<B>0</B>9955566
3486694453
8865585555
486558<B>0</B>644
4465574644

After step 8:
7818477333
5488477444
5697666949
46<B>0</B>876683<B>0</B>
473494673<B>0</B>
474<B>0</B><B>0</B>97688
69<B>0</B><B>0</B><B>0</B><B>0</B>7564
<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>9666
8<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>4755
68<B>0</B><B>0</B><B>0</B><B>0</B>7755

After step 9:
9<B>0</B>6<B>0</B><B>0</B><B>0</B><B>0</B>644
78<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>976
69<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>8<B>0</B>
584<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>82
5858<B>0</B><B>0</B><B>0</B><B>0</B>93
69624<B>0</B><B>0</B><B>0</B><B>0</B><B>0</B>
8<B>0</B>2125<B>0</B><B>0</B><B>0</B>9
222113<B>0</B><B>0</B><B>0</B>9
9111128<B>0</B>97
7911119976

After step 10:
<b>0</b>481112976
<b>0</b><b>0</b>31112<b>0</b><b>0</b>9
<b>0</b><b>0</b>411125<b>0</b>4
<b>0</b><b>0</b>811114<b>0</b>6
<b>0</b><b>0</b>991113<b>0</b>6
<b>0</b><b>0</b>93511233
<b>0</b>44236113<b>0</b>
553225235<b>0</b>
<b>0</b>53225<b>0</b>6<b>0</b><b>0</b>
<b>0</b><b>0</b>3224<b>0</b><b>0</b><b>0</b><b>0</b>
</pre>

After step 10, there have been a total of `204` flashes. Fast forwarding, here is the same configuration every 10 steps:

<pre>
After step 20:
3936556452
56865568<b>0</b>6
449655569<b>0</b>
444865558<b>0</b>
445686557<b>0</b>
568<b>0</b><b>0</b>86577
7<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>9896
<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>344
6<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>364
46<b>0</b><b>0</b><b>0</b><b>0</b>9543

After step 30:
<b>0</b>643334118
4253334611
3374333458
2225333337
2229333338
2276733333
2754574565
5544458511
9444447111
7944446119

After step 40:
6211111981
<b>0</b>421111119
<b>0</b><b>0</b>42111115
<b>0</b><b>0</b><b>0</b>3111115
<b>0</b><b>0</b><b>0</b>3111116
<b>0</b><b>0</b>65611111
<b>0</b>532351111
3322234597
2222222976
2222222762

After step 50:
9655556447
48655568<b>0</b>5
448655569<b>0</b>
445865558<b>0</b>
457486557<b>0</b>
57<b>0</b><b>0</b><b>0</b>86566
6<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>9887
8<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>533
68<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>633
568<b>0</b><b>0</b><b>0</b><b>0</b>538

After step 60:
25333342<b>0</b><b>0</b>
274333464<b>0</b>
2264333458
2225333337
2225333338
2287833333
3854573455
1854458611
1175447111
1115446111

After step 70:
8211111164
<b>0</b>421111166
<b>0</b><b>0</b>42111114
<b>0</b><b>0</b><b>0</b>4211115
<b>0</b><b>0</b><b>0</b><b>0</b>211116
<b>0</b><b>0</b>65611111
<b>0</b>532351111
7322235117
5722223475
4572222754

After step 80:
1755555697
59655556<b>0</b>9
448655568<b>0</b>
445865558<b>0</b>
457<b>0</b>86557<b>0</b>
57<b>0</b><b>0</b><b>0</b>86566
7<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>8666
<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>99<b>0</b>
<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>8<b>0</b><b>0</b>
<b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b><b>0</b>

After step 90:
7433333522
2643333522
2264333458
2226433337
2222433338
2287833333
2854573333
4854458333
3387779333
3333333333

After step 100:
<b>0</b>397666866
<b>0</b>749766918
<b>0</b><b>0</b>53976933
<b>0</b><b>0</b><b>0</b>4297822
<b>0</b><b>0</b><b>0</b>4229892
<b>0</b><b>0</b>53222877
<b>0</b>532222966
9322228966
7922286866
6789998766
</pre>

After 100 steps, there have been a total of **`1656`** flashes.

Given the starting energy levels of the dumbo octopuses in your cavern, simulate 100 steps. **How many total flashes are there after 100 steps?**

Your puzzle answer was `1546`.

## Part 2

It seems like the individual flashes aren't bright enough to navigate. However, you might have a better option: the flashes seem to be **synchronizing**!

In the example above, the first time all octopuses flash simultaneously is step **`195`**:

<pre>
After step 193:
5877777777
8877777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777

After step 194:
6988888888
9988888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888

After step 195:
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
</pre>

If you can calculate the exact moments when the octopuses will all flash simultaneously, you should be able to navigate through the cavern. **What is the first step during which all octopuses flash?**

Your puzzle answer was `471`.
