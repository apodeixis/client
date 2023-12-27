

export default class CompoundValidatorCollector {
    setState(elementId, state) {
        this.elementsError.set(elementId, state)
    }

    allFieldsValid() {
        for (let error of this.elementsError.values()) {
            if (error) {
                return false
            }
        }
        return true
    }

    reset() {
        this.elementsError.forEach(key => this.elementsError[key] = true)
    }

    elementsError = new Map()
}