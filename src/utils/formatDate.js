export default function formatDate(dateString) {
    const dateParts = dateString.split('T')[0].split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return day + '/' + month + '/' + year;
}