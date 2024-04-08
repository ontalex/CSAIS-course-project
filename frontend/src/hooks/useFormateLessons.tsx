export default function useFormateLessons(list) {
    let temp = [{}, {}, {}, {}, {}]

    for (let i = 0; i < list.length; i++) {
        temp[list[i].number_lesson - 1] = list[i]
    }

    return temp
}
