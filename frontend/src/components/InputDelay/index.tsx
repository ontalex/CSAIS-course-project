import { debounce } from 'lodash'

import Input from '../Input'

export default function InputDelay({ onChange }, ...props) {
    const debouncedOnChange = debounce(onChange, 750)
    return <Input onChange={debouncedOnChange} {...props} />
}
