function removeTag(str: string) {
    return str.replace(/<[^>]*>?/g, '');
}

export { removeTag };