function useSlug(fullName = '') {
    return fullName.trim().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, '-');
}

export default useSlug;
